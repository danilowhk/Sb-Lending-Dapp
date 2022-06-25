const { addresses } = require("../utils/deploymentHelpers");

async function main() {
  const metaMaskSigner = await hre.ethers.getSigner();
  const metaMaskUserAddress = metaMaskSigner.address;

  await hre.ethers.provider.send("hardhat_setBalance", [
    metaMaskUserAddress,
    ethers.utils.parseUnits("1000", "ether").toHexString().replace("0x0", "0x"),
  ]);

  //Ethereum Mainnet Oracles
  const { WETHOracleAddress,
    DaiOracleAddress,
    SBLOracleAddress } = addresses;

  //ERC20 Tokens Deployment

  const SbLending = await hre.ethers.getContractFactory(
    "sbLending",
    metaMaskSigner
  );
  let sbLending = await SbLending.deploy();
  await sbLending.deployed();
  console.log(`SoulBond Lending Contract: ${sbLending.address}`);

  const DaiToken = await hre.ethers.getContractFactory(
    "DaiToken",
    metaMaskSigner
  );
  let daiToken = await DaiToken.deploy();
  await daiToken.deployed();
  console.log(`DaiToken Address: ${daiToken.address}`);

  const WETHToken = await hre.ethers.getContractFactory(
    "WETHToken",
    metaMaskSigner
  );
  let wethToken = await WETHToken.deploy();
  await wethToken.deployed();
  console.log(`WETHToken Address: ${wethToken.address}`);

  const SblToken = await hre.ethers.getContractFactory(
    "SblToken",
    metaMaskSigner
  );
  let sblToken = await SblToken.deploy();
  await sblToken.deployed();
  console.log(`SBLToken Address: ${sblToken.address}`);

  //Deploying SoulBond Tokens
  const SoulBondS = await hre.ethers.getContractFactory(
    "SoulBondS",
    metaMaskSigner
  );
  let soulBondS = await SoulBondS.deploy();
  await soulBondS.deployed();
  console.log(`SB-S Address: ${soulBondS.address}`);

  const SoulBondA = await hre.ethers.getContractFactory(
    "SoulBondA",
    metaMaskSigner
  );
  const soulBondA = await SoulBondA.deploy();
  await soulBondA.deployed();
  console.log(`SB-A Address: ${soulBondA.address}`);

  const SoulBondB = await hre.ethers.getContractFactory(
    "SoulBondB",
    metaMaskSigner
  );
  const soulBondB = await SoulBondB.deploy();
  await soulBondB.deployed();
  console.log(`SB-B Address: ${soulBondB.address}`);

  const SoulBondC = await hre.ethers.getContractFactory(
    "SoulBondC",
    metaMaskSigner
  );
  const soulBondC = await SoulBondC.deploy();
  await soulBondC.deployed();
  console.log(`SB-C Address: ${soulBondC.address}`);

  const SoulBondD = await hre.ethers.getContractFactory(
    "SoulBondD",
    metaMaskSigner
  );
  const soulBondD = await SoulBondD.deploy();
  await soulBondD.deployed();
  console.log(`SB-D Address: ${soulBondD.address}`);

  //sbLending Contract Setup:
  //adding SoulBondTokens
  await sbLending.addSoulBondToken(soulBondS.address, 1, 7);
  await sbLending.addSoulBondToken(soulBondA.address, 2, 5);
  await sbLending.addSoulBondToken(soulBondB.address, 3, 3);
  await sbLending.addSoulBondToken(soulBondC.address, 4, 2);
  await sbLending.addSoulBondToken(soulBondD.address, 5, 1);

  //Adding Oracles(WETH only)
  await sbLending.addOracle(wethToken.address, WETHOracleAddress);
  await sbLending.addOracle(daiToken.address, DaiOracleAddress);
  await sbLending.addOracle(sblToken.address, SBLOracleAddress);

  //Adding Deposit Tokens
  await sbLending.addDepositToken(wethToken.address);
  await sbLending.addDepositToken(daiToken.address);
  await sbLending.addDepositToken(sblToken.address);

  //Adding Borrow Tokens
  await sbLending.addBorrowToken(wethToken.address);
  await sbLending.addBorrowToken(daiToken.address);
  await sbLending.addBorrowToken(sblToken.address);

  //Adding Interest Rates
  await sbLending.addTokenInterestFixedInterestRate(wethToken.address, 7);
  await sbLending.addTokenInterestFixedInterestRate(daiToken.address, 9);
  await sbLending.addTokenInterestFixedInterestRate(sblToken.address, 17);

  //Approve Tokens

  let approveAmount = hre.ethers.utils.parseEther("100000");
  await wethToken.approve(sbLending.address, approveAmount);
  const WETHallowance = await wethToken.allowance(
    metaMaskUserAddress,
    sbLending.address
  );

  await daiToken.approve(sbLending.address, approveAmount);
  const DaiAllowance = await daiToken.allowance(
    metaMaskUserAddress,
    sbLending.address
  );

  await sblToken.approve(sbLending.address, approveAmount);
  const SblAllowance = await sblToken.allowance(
    metaMaskUserAddress,
    sbLending.address
  );

  //Mint and Check Balances;
  await wethToken.mint(approveAmount);
  await daiToken.mint(approveAmount);
  await sblToken.mint(approveAmount);

  console.log(`WETHBalance: ${await wethToken.balanceOf(metaMaskUserAddress)}`);
  console.log(`DaiBalance: ${await daiToken.balanceOf(metaMaskUserAddress)}`);
  console.log(`SBLBalance: ${await sblToken.balanceOf(metaMaskUserAddress)}`);
  console.log(
    `WETH Allowance: ${hre.ethers.utils.formatEther(WETHallowance)} to: ${
      sbLending.address
    }`
  );
  console.log(
    `DAI Allowance: ${hre.ethers.utils.formatEther(DaiAllowance)} to: ${
      sbLending.address
    }`
  );
  console.log(
    `SBL Allowance: ${hre.ethers.utils.formatEther(SblAllowance)} to: ${
      sbLending.address
    }`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
