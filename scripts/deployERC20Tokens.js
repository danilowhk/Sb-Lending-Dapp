
const hre = require("hardhat");

async function main() {

  const Dai = await hre.ethers.getContractFactory("DaiToken");
  const dai = await Dai.deploy();
  await dai.deployed();

  const WETHToken = await hre.ethers.getContractFactory("WETHToken");
  const WETH = await WETHToken.deploy();
  await WETH.deployed();

  const SblToken = await hre.ethers.getContractFactory("SblToken");
  const sblToken  = await SblToken.deploy();
  await sblToken.deployed();


  console.log("DAI deployed to:", dai.address);

  console.log("WETH deployed to:", WETH.address);

  console.log("SBL deployed to:", sblToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
