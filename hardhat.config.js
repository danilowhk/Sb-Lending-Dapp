require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


module.exports = {
  solidity: "0.8.4",
  hardhat: {
    forking: {
      url: "https://eth-mainnet.alchemyapi.io/v2/EhxZmPeqBdUUx7xW2R_Ra6gJhg3hQzmR",
      blockNumber: 110000
    }
  }
};
