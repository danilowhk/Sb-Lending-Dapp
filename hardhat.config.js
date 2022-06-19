require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();

// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.alchemyapi.io/v2/EhxZmPeqBdUUx7xW2R_Ra6gJhg3hQzmR",
        blockNumber: 14986214
    }},
    localhost:{
      url: "http://127.0.0.1:8545/",
    },
    kovan: {
      url: process.env.KOVAN_URL,
      accounts: [process.env.KOVAN_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  },
  paths: {
    artifacts: "./sb-lending/src/contracts"
  }
};
