// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "hardhat/console.sol";

// need to pull all the contract to access the private variables.

// TODO: need to add the URIStorage here

contract ResearchFundingClub is ERC721Enumerable, Ownable, ERC721URIStorage {
    string public baseTokenURI;

    bool public paused = false;
    string public baseExtension = ".json";
    uint256 public MIN_SUPPLY = 1; // for random number generation
    uint256 public MAX_SUPPLY = 10;
    uint256 public PRICE = 0.0001 ether;
    uint256 public MAX_PER_MINT = 1;
    mapping(address => uint256) public addressMintedBalance;

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

    // function tokenURI(uint256 tokenId)
    //     public
    //     view
    //     override(ERC721, ERC721URIStorage)
    //     returns (string memory)
    // {
    //     return super.tokenURI(tokenId);
    //     // string memory tokenUri = super.tokenURI(tokenId);
    //     // return abi.encodePacked(tokenUri, baseExtension);
    //     // return ERC721URIStorage._tokenURIs[tokenId];
    // }

    function tokenURI(uint256 tokenId)
        public view virtual override returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI query for nonexistent token"
        );
    return _tokenURIs[tokenId];
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // function _baseURI() internal view virtual override returns (string memory) {
    //     return baseTokenURI;
    // }

    function _baseURI() internal view override returns (string memory) {
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

    function rand(address randomAddress, uint256 randomNo)
        internal
        view
        returns (uint256)
    {
        uint256 seed = uint256(
            keccak256(
                abi.encodePacked(
                    (block.timestamp - randomNo) +
                        block.difficulty +
                        ((
                            uint256(keccak256(abi.encodePacked(block.coinbase)))
                        ) / (block.timestamp)) +
                        block.gaslimit +
                        ((uint256(keccak256(abi.encodePacked(randomAddress)))) /
                            (block.timestamp)) +
                        block.number
                )
            )
        );

        // TODO: add MIN_SUPPLY -- increases efficiency while finding random numbers under set limits
        return (seed - ((seed / MAX_SUPPLY) * MAX_SUPPLY)) + 1;
    }

    /*
        @function selectRandomNumber()
        @description - Iteratively chooses a random number that has not been minted yet.
        @returns <uint> - unminted random number
    */

    function selectRandomNumber(uint256 randomNo) internal view returns (uint256) {
        uint256 supply = totalSupply();
        require(supply < MAX_SUPPLY, "Ran out of numbers.");

        uint256 mintNumber = rand(msg.sender, randomNo);        
        if (ERC721.testOwnerOf(mintNumber) == false) return mintNumber;
        return selectRandomNumber(mintNumber + randomNo);
    }

    // function selectRandomNumber(uint256 randomNo) internal view returns (uint256) {
    //     uint256 supply = totalSupply();
    //     require(supply < MAX_SUPPLY, "no numbers left.");

    //     uint256 mintNumber = rand(msg.sender, randomNo);
    //     console.log("random number: ", mintNumber);

    //     if (ERC721.testOwnerOf(mintNumber) == false) {
    //         console.log("Found final mint number: ", mintNumber);
    //         return mintNumber;
    //     }

    //     console.log("Oops mint number was duplicate.");
    //     return selectRandomNumber(mintNumber + randomNo);
    // }

    function mint(uint256 _mintAmount) public payable {
        require(!paused, "The contract is paused");
        uint256 supply = totalSupply();
        require(_mintAmount > 0, "mint atleast 1 NFT");
        require(supply + _mintAmount <= MAX_SUPPLY, "max NFT limit exceeded"); // multiple minting

        // Production
        // require(_mintAmount <= MAX_PER_MINT, "max NFT per address exceeded");
        // require(supply + _mintAmount <= MAX_SUPPLY, "max NFT limit exceeded");

        // // prevent remints through token transfers  
        // uint256 ownerMintedCount = addressMintedBalance[msg.sender];
        // require(ownerMintedCount + _mintAmount <= MAX_PER_MINT, "max NFT per address exceeded");

        uint256 mintNumber = selectRandomNumber(0);
        require(msg.value >= PRICE * _mintAmount, "insufficient funds");  
        
        addressMintedBalance[msg.sender]++;
        _safeMint(msg.sender, mintNumber);

        string memory tokenUri = Strings.toString(mintNumber);
        // _setTokenURI(mintNumber, abi.encodePacked(tokenUri, baseExtension));
        _setTokenURI(mintNumber, tokenUri);
    }

    function generateRandomNumber() public view returns (uint256) {
        return selectRandomNumber(0);
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

/*
    Developed by Manish Gotame - https://manishgotame.com.np/
 */