// deploys the contract on the chosen network
async function main() {
  // const baseTokenURI = "https://gateway.pinata.cloud/ipfs/QmV8MxrRVzwSGSszqx1qcisz7esenPpq9QFmFBTBWa3vVS/";

  const baseTokenURI = "https://gateway.pinata.cloud/ipfs/QmPnytScaJWApNsC86YrX2zAVGzDjPejmWLwevadmcg5AM/";
  const hiddenURI = "https://gateway.pinata.cloud/ipfs/QmSJ5JkSpLdrb1sFfJZNc7xufXCvCvQ7LVxbp6jubKGddP/";

  // the fast version
  const contractFactory = await hre.ethers.getContractFactory(
    "ResearchFundingClub"
  );

  const contract = await contractFactory.deploy(500, hiddenURI);
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);

  // mint one

  // var mintTX = await contract.mint(1, {
  //   value: 100000000000
  // });

  // await mintTX.wait();

  // var mintTX2 = await contract.mint(1, {
  //   value: 100000000000
  // });

  // await mintTX2.wait();
  
  // var mintTX3 = await contract.mint(1, {
  //   value: 100000000000
  // });

  // await mintTX3.wait();


  // reveal

  // await contract.reveal(baseTokenURI);
  // console.log("nft has been revealed");

  // set up new collection

  // await contract.newDrop(2);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
