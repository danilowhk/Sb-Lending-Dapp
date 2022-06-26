const addresses = {
  WETHOracleAddress: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  SBLOracleAddress: "0x547a514d5e3769680Ce22B2361c10Ea13619e8a9",
  DaiOracleAddress: "0xaed0c38402a5d19df6e4c03f4e2dced6e29c1ee9",
  mainnetWETHAddress: "0x51C65cd0Cdb1A8A8b79dfc2eE965B1bA0bb8fc89",
  mainnetDaiAddress: "0x87006e75a5B6bE9D1bbF61AC8Cd84f05D9140589",
  sbLendingAddress: "0x82EdA215Fa92B45a3a76837C65Ab862b6C7564a8",
  WETHAddress: "0x51C65cd0Cdb1A8A8b79dfc2eE965B1bA0bb8fc89",
  DaiAddress:"0x87006e75a5B6bE9D1bbF61AC8Cd84f05D9140589",
  SblTokenAddress: "0x8fC8CFB7f7362E44E472c690A6e025B80E406458"
}

async function deployProtocol() {
  const metaMaskSigner = await hre.ethers.getSigner();
  const metaMaskUserAddress = metaMaskSigner.address;

  await hre.ethers.provider.send("hardhat_setBalance", [
    metaMaskUserAddress,
    ethers.utils.parseUnits("1000", "ether").toHexString().replace("0x0", "0x"),
  ]);

  //Ethereum Mainnet Oracles
  const WETHOracleAddress = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
  const SBLOracleAddress = "0x547a514d5e3769680Ce22B2361c10Ea13619e8a9";
  const DaiOracleAddress = "0xaed0c38402a5d19df6e4c03f4e2dced6e29c1ee9";

  //ERC20 Tokens Deployment

  const SbLending = await hre.ethers.getContractFactory(
    "sbLending",
    metaMaskSigner
  );
  const sbLending = await SbLending.deploy();
  await sbLending.deployed();
  // console.log(`SoulBond Lending Contract: ${sbLending.address}`)

  const DaiToken = await hre.ethers.getContractFactory(
    "DaiToken",
    metaMaskSigner
  );
  const daiToken = await DaiToken.deploy();
  await daiToken.deployed();
  // console.log(`DaiToken Address: ${daiToken.address}`)

  const WETHToken = await hre.ethers.getContractFactory(
    "WETHToken",
    metaMaskSigner
  );
  const wethToken = await WETHToken.deploy();
  await wethToken.deployed();
  // console.log(`WETHToken Address: ${wethToken.address}`)

  const SblToken = await hre.ethers.getContractFactory(
    "SblToken",
    metaMaskSigner
  );
  const sblToken = await SblToken.deploy();
  await sblToken.deployed();
  // console.log(`SBLToken Address: ${sblToken.address}`)

  //Deploying SoulBond Tokens
  const SoulBondS = await hre.ethers.getContractFactory(
    "SoulBondS",
    metaMaskSigner
  );
  const soulBondS = await SoulBondS.deploy();
  await soulBondS.deployed();
  // console.log(`SB-S Address: ${soulBondS.address}`)

  const SoulBondA = await hre.ethers.getContractFactory(
    "SoulBondA",
    metaMaskSigner
  );
  const soulBondA = await SoulBondA.deploy();
  await soulBondA.deployed();
  // console.log(`SB-A Address: ${soulBondA.address}`)

  const SoulBondB = await hre.ethers.getContractFactory(
    "SoulBondB",
    metaMaskSigner
  );
  const soulBondB = await SoulBondB.deploy();
  await soulBondB.deployed();
  // console.log(`SB-B Address: ${soulBondB.address}`)

  const SoulBondC = await hre.ethers.getContractFactory(
    "SoulBondC",
    metaMaskSigner
  );
  const soulBondC = await SoulBondC.deploy();
  await soulBondC.deployed();
  // console.log(`SB-C Address: ${soulBondC.address}`)

  const SoulBondD = await hre.ethers.getContractFactory(
    "SoulBondD",
    metaMaskSigner
  );
  const soulBondD = await SoulBondD.deploy();
  await soulBondD.deployed();
  // console.log(`SB-D Address: ${soulBondD.address}`)

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

  const approveAmount = hre.ethers.utils.parseEther("100000");
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

  return {
    metaMaskUserAddress,
    metaMaskSigner,
    sbLending,
    wethToken,
    daiToken,
    sblToken,
    soulBondS,
  };
}

module.exports = {
  addresses,
  deployProtocol,
}
