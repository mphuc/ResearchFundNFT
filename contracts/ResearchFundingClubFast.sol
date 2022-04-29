// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

/*
 We are going to optimize this contract as much as possible

 I am still not confident about the unchecked funtionality but will learn and implement it someday
 */

import "./ERC721A.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

error URIQueryForNonexistentTokenRFC();
error SaleIncomplete();
error CollectionNotRevealedYet();
error ContractPaused();
error ZeroMintFailed();
error MaxPerNFTAddrExceeded();
error SoldOut();
error InsufficientFunds();

contract ResearchFundingClubFast is ERC721A, ERC2981, Ownable, ReentrancyGuard {
    using Strings for uint256;

    // should also have owner address so the amount goes to that owner?
    struct CollectionData {
        uint256 minSupply;
        uint256 maxSupply;
        string baseURI;   
    }

    string public baseTokenURI;
    bool public paused = true;
    string public baseExtension = ".json";
    string public notRevealedURI;
    string public baseURI;

    uint256 public MIN_SUPPLY = 0; // only used for multi-drop reveals
    uint256 public MAX_SUPPLY = 10;
    
    uint256 public PRICE = 0.0001 ether;
    uint256 public MAX_PER_MINT = 1;
    bool public revealed = false;

    uint256 public collectionID = 1;
    mapping(uint256 => CollectionData) public collections;

    // Wallets
    address public charityWallet = 0xf9351CFAB08d72e873424708A817A067fA33F45F;
    address public devWallet = 0xf9351CFAB08d72e873424708A817A067fA33F45F;

    constructor(uint96 _royaltyFeesInBips, string memory _notRevealedURI) ERC721A("Research Funding Club", "RFC") {
        setRoyaltyInfo(msg.sender, _royaltyFeesInBips); // 2.5% = 2.5 * 100 = 250
        notRevealedURI = _notRevealedURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721A)
        returns (string memory)
    {
        if (!_exists(tokenId)) revert URIQueryForNonexistentTokenRFC();

        if (!revealed && tokenId >= MIN_SUPPLY) {
            return notRevealedURI;
        }

        for (uint256 i=1; i <= collectionID; i++) {
            if (tokenId < collections[i].maxSupply) {
                console.log("THE URI:", collections[i].baseURI);
                tokenId = tokenId - collections[i].minSupply;
                return string(abi.encodePacked(collections[i].baseURI, tokenId.toString(), baseExtension));
            }
        }

        return '';
    }

    function setRoyaltyInfo(address _receiver, uint96 _royaltyFeesInBips) public onlyOwner {
        _setDefaultRoyalty(_receiver, _royaltyFeesInBips);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721A, ERC2981)
        returns (bool)
    {
        return (
            interfaceId == type(IERC2981).interfaceId ||
            super.supportsInterface(interfaceId)
        );
    }

    function mint(uint256 _mintAmount) external payable {
        if (paused) revert ContractPaused();
        if (_mintAmount == 0) revert ZeroMintFailed();
        if (_mintAmount > MAX_PER_MINT) revert MaxPerNFTAddrExceeded();
        uint256 supply = totalSupply();
        if (supply + _mintAmount > MAX_SUPPLY) revert SoldOut();
        if (msg.value < PRICE * _mintAmount) revert InsufficientFunds();

        _safeMint(msg.sender, _mintAmount);
    }

    function tokensOfOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokensId;
    }

    function getCollectionInfo(uint256 _id) external view returns(CollectionData memory) {
        return collections[_id];
    }

    function reveal(string memory _newBaseURI) external onlyOwner {
        CollectionData memory collection;
        collection.minSupply = MIN_SUPPLY;
        collection.maxSupply = MAX_SUPPLY;
        collection.baseURI = _newBaseURI;

        collections[collectionID] = collection;
        revealed = true;
        collectionID++;
    }

    /*
        @function newDrop()
        @description - Set the next NFT collection drop: increase max supply and the base uri
        @params - updated max mint supply
    */
    function newDrop(uint256 _newMaxSupply)
        external 
        onlyOwner
    {   
        console.log("total supply: ", totalSupply());
        if (totalSupply() != MAX_SUPPLY) revert SaleIncomplete();
        if (!revealed) revert CollectionNotRevealedYet();

        MIN_SUPPLY = MAX_SUPPLY;
        MAX_SUPPLY +=_newMaxSupply;
        
        revealed = false;
    }


    function setmaxMintAmount(uint256 _limit) public onlyOwner {
        MAX_PER_MINT = _limit;
    }

    function setmaxSupply(uint256 _limit) public onlyOwner {
        MAX_SUPPLY = _limit;
    }

    function setCost(uint256 _newCost) public onlyOwner {
        PRICE = _newCost;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedURI = _notRevealedURI;
    }
    
    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }
    
    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function withdraw() public onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw.");

        (bool cw, ) = (charityWallet).call{
            value: (address(this).balance * 10) / 100
        }("");
        require(cw, "Charity Transfer failed.");

        (bool df, ) = (devWallet).call{
            value: (address(this).balance * 5) / 100
        }("");
        require(df, "Developer Transfer failed.");

        // owner
        (bool success, ) = (msg.sender).call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }
}