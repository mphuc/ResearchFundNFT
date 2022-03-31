// deploys the contract on the chosen network
async function main() {
  const baseTokenURI = "https://gateway.pinata.cloud/ipfs/QmV8MxrRVzwSGSszqx1qcisz7esenPpq9QFmFBTBWa3vVS/";

  const contractFactory = await hre.ethers.getContractFactory(
    "ResearchFundingClub"
  );

  const contract = await contractFactory.deploy(baseTokenURI);

  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
