// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const ethers = require("hardhat");
const { BigNumber } = require("ethers");
const WETHArtifact = require('../sb-lending/src/contracts/contracts/WETH.sol/WETHToken.json')
const sbLendingArtifact = require('../sb-lending/src/contracts/contracts/sbLending-V0.sol/sbLending.json')


let sbLending;
let wethToken;
let daiToken;
let sblToken;




async function main() {


  //Ethereum Mainnet Oracles
  const WETHOracleAddress = '0x986b5E1e1755e3C2440e960477f25201B0a8bbD4';
  const SBLOracleAddress = '0x547a514d5e3769680Ce22B2361c10Ea13619e8a9';
  const DaiOracleAddress='0xaed0c38402a5d19df6e4c03f4e2dced6e29c1ee9';
  

  //Mainnet WETH, DAI, Aave Addres;
  const mainnetWETHAddress='0x51C65cd0Cdb1A8A8b79dfc2eE965B1bA0bb8fc89';
  const mainnetDaiAddress='0x87006e75a5B6bE9D1bbF61AC8Cd84f05D9140589';
  const mainnetAaveAddress='';
  const metaMaskUserAddress='0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8';

  const WETHAbi = WETHArtifact.abi;
  const DaiAbi= WETHArtifact.abi;
  const sbLendingAbi= sbLendingArtifact.abi;
  const AaveAbi= '';

  const SbLending = await hre.ethers.getContractFactory("sbLending");
  sbLending = await SbLending.deploy();
  await sbLending.deployed();
  console.log(`sbLending Address: ${sbLending.address}`)
  console.log(`sbLending Signer: ${sbLending.signer.address}`);



  //-----------ERC20 Tokens and SBL Token Deployment
  const DaiToken = await hre.ethers.getContractFactory("DaiToken");
  daiToken = await DaiToken.deploy();
  await daiToken.deployed();
  console.log(`daiToken Address: ${daiToken}`)

  const WETHToken = await hre.ethers.getContractFactory("WETHToken");
  wethToken = await WETHToken.deploy();
  await wethToken.deployed();
  console.log(`WETHToken Address: ${wethToken.address}`)


  const SblToken = await hre.ethers.getContractFactory("SblToken");
  sblToken = await SblToken.deploy();
  await sblToken.deployed();
  console.log(`SBLToken Address: ${sblToken.address}`)



  //-----------SoulBond Tokens
  const SoulBondS = await hre.ethers.getContractFactory("SoulBondS");
  const soulBondS = await SoulBondS.deploy();
  await soulBondS.deployed();
  console.log(`SB-S Address: ${soulBondS.address}`)


  const SoulBondA = await hre.ethers.getContractFactory("SoulBondA");
  const soulBondA = await SoulBondA.deploy();
  await soulBondA.deployed();
  console.log(`SB-A Address: ${soulBondA.address}`)


  const SoulBondB = await hre.ethers.getContractFactory("SoulBondB");
  const soulBondB = await SoulBondB.deploy();
  await soulBondB.deployed();
  console.log(`SB-B Address: ${soulBondB.address}`)


  const SoulBondC = await hre.ethers.getContractFactory("SoulBondC");
  const soulBondC = await SoulBondC.deploy();
  await soulBondC.deployed();
  console.log(`SB-C Address: ${soulBondC.address}`)


  const SoulBondD = await hre.ethers.getContractFactory("SoulBondD");
  const soulBondD = await SoulBondD.deploy();
  await soulBondD.deployed();
  console.log(`SB-D Address: ${soulBondD.address}`)


  //adding SoulBondTokens
  await sbLending.addSoulBondToken(soulBondS.address, 1,7);
  await sbLending.addSoulBondToken(soulBondA.address, 2,5);
  await sbLending.addSoulBondToken(soulBondB.address, 3,3);
  await sbLending.addSoulBondToken(soulBondC.address, 4,2);
  await sbLending.addSoulBondToken(soulBondD.address, 5,1);

  

  //Adding Oracles(WETH only)
  await sbLending.addOracle(mainnetWETHAddress,WETHOracleAddress)
  await sbLending.addOracle(mainnetDaiAddress,DaiOracleAddress)




  //Adding Deposit Tokens
  await sbLending.addDepositToken(mainnetWETHAddress);
  await sbLending.addDepositToken(mainnetDaiAddress);
  // await sbLending.addDepositToken(sblToken.address);

  //Adding Borrow Tokens
  await sbLending.addBorrowToken(mainnetWETHAddress);
  await sbLending.addBorrowToken(mainnetDaiAddress);
  // await sbLending.addBorrowToken(sblToken.address);

  //Adding Interest Rates
  await sbLending.addTokenInterestFixedInterestRate(mainnetWETHAddress, 7);
  await sbLending.addTokenInterestFixedInterestRate(mainnetDaiAddress, 9);
  // await sbLending.addTokenInterestFixedInterestRate(sblToken.address, 17);

  console.log("Deployments Finished!")

  //mint ERC20s
  let approveAmount= hre.ethers.utils.parseEther('10000');
  await wethToken.mint(approveAmount);
  await daiToken.mint(approveAmount);
  console.log(`WETHBalance: ${await wethToken.balanceOf(metaMaskUserAddress)}`)
  console.log(`DaiBalance: ${await daiToken.balanceOf(metaMaskUserAddress)}`)

  //mint SoulbBonds



  
}




main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
