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

contract ResearchFundingClubFast is ERC721A, ERC2981, Ownable, ReentrancyGuard {
    string public baseTokenURI;

    bool public paused = false;
    string public baseExtension = ".json";
    string public notRevealedURI;
    uint256 public MIN_SUPPLY = 0; // only used for multi-drop reveals
    uint256 public MAX_SUPPLY = 10;
    uint256 public PRICE = 0.0001 ether;
    uint256 public MAX_PER_MINT = 1;
    bool public revealed = false;

    // Wallets
    address public charityWallet = 0xf9351CFAB08d72e873424708A817A067fA33F45F;
    address public devWallet = 0xf9351CFAB08d72e873424708A817A067fA33F45F;

    constructor(uint96 _royaltyFeesInBips, string memory _notRevealedURI) ERC721A("Research Funding Club", "RFC") {
        setRoyaltyInfo(msg.sender, _royaltyFeesInBips); // 2.5% = 2.5 * 100 = 250
        notRevealedURI = _notRevealedURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721A)
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI query for nonexistent token"
        );

        if (!revealed && tokenId > MIN_SUPPLY) {
            // console.log("this is the token id: ", tokenId);
            // console.log("min supply:", MIN_SUPPLY);
            return notRevealedURI;
        }

        return super.tokenURI(tokenId);
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

    function mint(uint256 quantity) external payable {
        // _safeMint's second argument now takes in a quantity, not a tokenId.
        _safeMint(msg.sender, quantity);
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

    // owner functions

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
    
    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }
}