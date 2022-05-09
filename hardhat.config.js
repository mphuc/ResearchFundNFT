require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "iAJWLiE3bAWhyZ2foX_sYLWrXAg4F76Z";

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const RINKEBY_PRIVATE_KEY = "";
const POLYGON_PRIVATE_KEY = "";


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */


module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.1",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          }
        },
      },
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          }
        },
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          }
        },
      },
    ]
  },
  // networks: {
  //   hardhat: {
  //     forking: {
  //       url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`
  //     }
  //   },
  //   polygon: {
  //     url: `https://rpc-mumbai.maticvigil.com`,
  //     accounts: [`${POLYGON_PRIVATE_KEY}`]
  //   },
  //   rinkeby: {
  //     url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
  //     accounts: [`${RINKEBY_PRIVATE_KEY}`]
  //   }
  // },
  // etherscan: {
  //   apiKey: "PSXD1G3KX4XBG6A1HA7IX55CFD9KCRC67Q"
  // }
};
