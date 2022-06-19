// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const ethers = require("hardhat");

async function main() {

  const SbLending = await hre.ethers.getContractFactory("sbLending");
  const sbLending = await SbLending.deploy();
  await sbLending.deployed();

  //ERC20 Tokens
  const WETHToken = await hre.ethers.getContractFactory("WETHToken");
  const WETH = await WETHToken.deploy();
  await WETH.deployed();

  const Dai = await hre.ethers.getContractFactory("DaiToken");
  const dai = await Dai.deploy();
  await dai.deployed();

  const SblToken = await hre.ethers.getContractFactory("SblToken");
  const sblToken  = await SblToken.deploy();
  await sblToken.deployed();

  //SoulBondTokens
  const SoulBondS = await hre.ethers.getContractFactory("SoulBondS");
  const soulBondS = await SoulBondS.deploy();
  await soulBondS.deployed();

  const SoulBondA = await hre.ethers.getContractFactory("SoulBondA");
  const soulBondA = await SoulBondA.deploy();
  await soulBondA.deployed();

  const SoulBondB = await hre.ethers.getContractFactory("SoulBondB");
  const soulBondB = await SoulBondB.deploy();
  await soulBondB.deployed();

  const SoulBondC = await hre.ethers.getContractFactory("SoulBondC");
  const soulBondC = await SoulBondC.deploy();
  await soulBondC.deployed();

  const SoulBondD = await hre.ethers.getContractFactory("SoulBondD");
  const soulBondD = await SoulBondD.deploy();
  await soulBondD.deployed();


  


  console.log("sbLendingV0 deployed to:", sbLending.address);
  console.log("----ERC20 Tokens----")
  console.log("WETH deployed to:", WETH.address);
  console.log("DAI deployed to:", dai.address);
  console.log("SBL deployed to:", sblToken.address);
  console.log("----SoulBond Tokens Tokens----")


  console.log("https://kovan.etherscan.io/");






}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
