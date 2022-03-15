
// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";  

// TODO: need to add the URIStorage here

contract ResearchFundingClub is ERC721Enumerable, Ownable {
    string public baseTokenURI;

    bool public paused = false;
    string public baseExtension = ".json";
    uint256 public MAX_SUPPLY = 5;
    uint256 public PRICE = 0.0001 ether;
    uint256 public MAX_PER_MINT = 1;
    mapping(address => uint256) public addressMintedBalance;

    constructor(string memory baseURI) ERC721("Research Funding Club", "RFC") {
        setBaseURI(baseURI);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
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

    function mint(uint256 _mintAmount) public payable {
        /*
            - users transfers nft to another wallet
                - user cannot mint but the another wallet can mint.
            - there are two checks, is that necessary? try to keep it simple
        */
        require(!paused, "The contract is paused");
        uint256 supply = totalSupply();
        require(_mintAmount > 0, "mint atleast 1 NFT");
        require(supply + _mintAmount <= MAX_SUPPLY, "max NFT limit exceeded");

        require(_mintAmount <= MAX_PER_MINT, "max NFT per address exceeded");
        require(supply + _mintAmount <= MAX_SUPPLY, "max NFT limit exceeded");

        // prevent remints through token transfers  
        uint256 ownerMintedCount = addressMintedBalance[msg.sender];
        require(ownerMintedCount + _mintAmount <= MAX_PER_MINT, "max NFT per address exceeded");
        require(msg.value >= PRICE * _mintAmount, "insufficient funds");  

       for (uint256 i = 1; i <= _mintAmount; i++) {
            addressMintedBalance[msg.sender]++;
            _safeMint(msg.sender, supply + i);
        }
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

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
        baseExtension = _newBaseExtension;
    }

    // function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
    //     notRevealedUri = _notRevealedURI;
    // }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }
    
    function withdraw() public payable onlyOwner {
        // developer fee 2%? 
        uint256 balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw.");
        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }
}