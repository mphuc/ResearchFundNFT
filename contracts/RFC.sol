
// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";  

import "hardhat/console.sol";

// TODO: need to add the URIStorage here

contract ResearchFundingClub is ERC721Enumerable, Ownable {
    string public baseTokenURI;

    bool public paused = false;
    string public baseExtension = ".json";
    uint256 public MIN_SUPPLY = 25; // for random number generation
    uint256 public MAX_SUPPLY = 50;
    uint256 public PRICE = 0.0001 ether;
    uint256 public MAX_PER_MINT = 1;
    mapping(address => uint256) public addressMintedBalance;

    // testing

    uint256 public prevRandomNumber = 1; 

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
        uint256 mintNumber = rand(msg.sender, randomNo);

        return mintNumber;
    }

    function mint(uint256 _mintAmount, uint256 mintNumber) public payable {
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

        require(msg.value >= PRICE * _mintAmount, "insufficient funds");  
        
        addressMintedBalance[msg.sender]++;
        _safeMint(msg.sender, mintNumber);
    }

    function newOwner(uint256 tokenId) public view virtual override returns (address) {
        address owner = ERC721._owners[tokenId];
        console.log(owner);
        return owner;
    }

    function generateRandomNumber() public onlyOwner {
        
        // if (ownerOf(1)) {
        //     console.log("found");
        // } else {
        //     console.log("not found");
        // }
        
        // try ownerOf(1) {
        //     console.log(ownerOf(1));
        // } catch Error(string memory /*reason */) {
        //     console.log("no owners");
        // }

        console.log(ownerOf(1));
        // console.log(ERC721._owners[0]);


        // uint256 no = selectRandomNumber(1);
        // console.log(no);
        // prevRandomNumber = rand(msg.sender, prevRandomNumber);
    }

    function currentRandomNumber() public view returns (uint256) {
        return prevRandomNumber;
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