const { addresses } = require("../utils/deploymentHelpers");

async function main() {
  const metaMaskSigner = await hre.ethers.getSigner();
  const metaMaskUserAddress = metaMaskSigner.address;

  await hre.ethers.provider.send("hardhat_setBalance", [
    metaMaskUserAddress,
    ethers.utils.parseUnits("1000", "ether").toHexString().replace("0x0", "0x"),
  ]);

  //Ethereum Mainnet Oracles
  const { WETHOracleAddress, DaiOracleAddress, SBLOracleAddress } = addresses;

  //ERC20 Tokens Deployment

  const SbLending = await hre.ethers.getContractFactory(
    "sbLending",
    metaMaskSigner
  );
  let sbLending = await SbLending.deploy();
  await sbLending.deployed();
  console.log(`SoulBound Lending Contract: ${sbLending.address}`);

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

  //Deploying SoulBound Tokens
  const SoulBoundS = await hre.ethers.getContractFactory(
    "SoulBoundS",
    metaMaskSigner
  );
  let soulBoundS = await SoulBoundS.deploy();
  await soulBoundS.deployed();
  console.log(`SB-S Address: ${soulBoundS.address}`);

  const SoulBoundA = await hre.ethers.getContractFactory(
    "SoulBoundA",
    metaMaskSigner
  );
  const soulBoundA = await SoulBoundA.deploy();
  await soulBoundA.deployed();
  console.log(`SB-A Address: ${soulBoundA.address}`);

  const SoulBoundB = await hre.ethers.getContractFactory(
    "SoulBoundB",
    metaMaskSigner
  );
  const soulBoundB = await SoulBoundB.deploy();
  await soulBoundB.deployed();
  console.log(`SB-B Address: ${soulBoundB.address}`);

  const SoulBoundC = await hre.ethers.getContractFactory(
    "SoulBoundC",
    metaMaskSigner
  );
  const soulBoundC = await SoulBoundC.deploy();
  await soulBoundC.deployed();
  console.log(`SB-C Address: ${soulBoundC.address}`);

  const SoulBoundD = await hre.ethers.getContractFactory(
    "SoulBoundD",
    metaMaskSigner
  );
  const soulBoundD = await SoulBoundD.deploy();
  await soulBoundD.deployed();
  console.log(`SB-D Address: ${soulBoundD.address}`);

  //sbLending Contract Setup:
  //adding SoulBoundTokens
  await sbLending.addSoulBoundToken(soulBoundS.address, 1, 7);
  await sbLending.addSoulBoundToken(soulBoundA.address, 2, 5);
  await sbLending.addSoulBoundToken(soulBoundB.address, 3, 3);
  await sbLending.addSoulBoundToken(soulBoundC.address, 4, 2);
  await sbLending.addSoulBoundToken(soulBoundD.address, 5, 1);

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
