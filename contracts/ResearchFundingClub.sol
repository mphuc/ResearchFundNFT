pragma solidity 0.8.1;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

/*
    Understanding the smart contract so far.

    - ERC721URIStorage -- expensive method of storing token ids
 */

contract ResearchFundingClub is ERC721URIStorage {
    string public baseTokenURI;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant MAX_SUPPLY = 25;
    uint256 public constant PRICE = 1 ether;
    uint256 public constant MAX_PER_MINT = 1;

    constructor(string memory baseURI) ERC721("Research Funding Club", "RFC") {
        setBaseURI(baseURI);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
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

    function withdraw() public payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ether left to withdraw.");
        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Transfer failed.");
    }

    function mintNFTs(uint256 _count) public payable virtual {
        uint256 newItemId = _tokenIds.current();

        require(newItemId.add(_count) <= MAX_SUPPLY, "All NFTs are minted!");
        require(
            _count > 0 && _count <= MAX_PER_MINT,
            "Cannot mint more than one NFT."
        );
        require(
            msg.value >= PRICE.mul(_count),
            "Not enough ether to purchase NFT."
        );
        for (uint256 i = 0; i < _count; i++) {
            _mintSingleNFT();
        }

        _safeMint(msg.sender, newItemId);

        _tokenIds.increment();

        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );
    }
}
