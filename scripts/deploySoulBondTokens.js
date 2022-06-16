
const hre = require("hardhat");

async function main() {

    


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



  console.log("SoulBondS deployed to:", soulBondS.address);
  console.log("SoulBondA deployed to:", soulBondA.address);
  console.log("SoulBondB deployed to:", soulBondB.address);
  console.log("SoulBondC deployed to:", soulBondC.address);
  console.log("SoulBondD deployed to:", soulBondD.address);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
