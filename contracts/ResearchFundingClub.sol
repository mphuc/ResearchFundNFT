// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

contract ResearchFundingClub3 is ERC721Enumerable, Ownable, ERC721URIStorage {
    string public baseTokenURI;

    bool public paused = false;
    string public baseExtension = ".json";
    string public notRevealedURI = "not revealed yet";
    uint256 public MIN_SUPPLY = 1; // for random number generation
    uint256 public MAX_SUPPLY = 10;
    uint256 public PRICE = 0.0001 ether;
    uint256 public MAX_PER_MINT = 1;
    bool public revealed = false;

    constructor(string memory baseURI) ERC721("Research Funding Club", "RFC") {
        setBaseURI(baseURI);
    }
    
    // ERC721URIStorage override functions 
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public 
        view 
        virtual 
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI query for nonexistent token"
        );

        if (!revealed && tokenId > MIN_SUPPLY ) {
            // console.log("this is the token id: ", tokenId);
            // console.log("min supply:", MIN_SUPPLY);
            return notRevealedURI;
        }
        
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal pure override returns (string memory) {return "";}

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

    /*
        @function mint()
        @description - Mints an NFT to the sender
    */
    function mint(uint256 _mintAmount) public payable {
        require(!paused, "The contract is paused");
        uint256 supply = totalSupply();
        require(_mintAmount > 0, "mint atleast 1 NFT");
        require(supply + _mintAmount <= MAX_SUPPLY, "max NFT limit exceeded"); // multiple minting
        // require(_mintAmount <= MAX_PER_MINT, "max NFT per address exceeded");

        uint256 mintNumber = supply + 1;
        require(msg.value >= PRICE * _mintAmount, "insufficient funds");  
        
        _safeMint(msg.sender, mintNumber);
        _setTokenURI(mintNumber, string(abi.encodePacked(baseTokenURI, Strings.toString(mintNumber), baseExtension)));
    }

    /*
        @function newDrop()
        @description - Set the next NFT collection drop: increase max supply and the base uri
        @params - updated max mint supply, new base uri
    */
    function newDrop(uint256 _newMaxSupply, string memory _newBaseURI) public onlyOwner {
        require(totalSupply() == MAX_SUPPLY, "Previous drop sales has not finished yet.");
        MIN_SUPPLY = MAX_SUPPLY;
        MAX_SUPPLY = _newMaxSupply;
        setBaseURI(_newBaseURI);
        revealed = false;
    }
    
    function reveal() public onlyOwner {
      revealed = true;
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

    function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
        baseExtension = _newBaseExtension;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }
    
    function withdraw() public payable onlyOwner {
        // developer fee 3%? 
        uint256 balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw.");
        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }
}