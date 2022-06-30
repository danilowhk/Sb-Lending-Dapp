const { expect } = require("chai");
const { assert } = require("console");
const { ethers } = require("hardhat");

describe("sbLending", function () {

  let metaMaskUserAddress;
  let metaMaskSigner;
  let sbLending;
  let wethToken;
  let daiToken;
  let sblToken;
  let soulBondS;

  before('', async function(){
    metaMaskUserAddress='0xd770134156f9aB742fDB4561A684187f733A9586';
    const ETHWhale = '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8';

    //Impersonate Whale
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [ETHWhale],
    });

    const ETHsigner = await hre.ethers.getSigner(ETHWhale);
 
      //send ETH
      await ETHsigner.sendTransaction({
        to: metaMaskUserAddress,
        value: hre.ethers.utils.parseEther("2000") // 1000 ether
      })

    //Ethereum Mainnet Oracles
    const WETHOracleAddress = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419';
    const SBLOracleAddress = '0x547a514d5e3769680Ce22B2361c10Ea13619e8a9';
    const DaiOracleAddress='0xaed0c38402a5d19df6e4c03f4e2dced6e29c1ee9';
    //Address to be used in Metamask
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [metaMaskUserAddress],
    });
    metaMaskSigner = await hre.ethers.getSigner(metaMaskUserAddress);

    //ERC20 Tokens Deployment

    const SbLending = await hre.ethers.getContractFactory("sbLending",metaMaskSigner);
    sbLending = await SbLending.deploy();
    await sbLending.deployed();
    // console.log(`SoulBond Lending Contract: ${sbLending.address}`)

    const DaiToken = await hre.ethers.getContractFactory("DaiToken",metaMaskSigner);
    daiToken = await DaiToken.deploy();
    await daiToken.deployed();
    // console.log(`DaiToken Address: ${daiToken.address}`)

    const WETHToken = await hre.ethers.getContractFactory("WETHToken",metaMaskSigner);
    wethToken = await WETHToken.deploy();
    await wethToken.deployed();
    // console.log(`WETHToken Address: ${wethToken.address}`)
  
    const SblToken = await hre.ethers.getContractFactory("SblToken",metaMaskSigner);
    sblToken = await SblToken.deploy();
    await sblToken.deployed();
    // console.log(`SBLToken Address: ${sblToken.address}`)

    //Deploying SoulBond Tokens
    const SoulBondS = await hre.ethers.getContractFactory("SoulBondS",metaMaskSigner);
    soulBondS = await SoulBondS.deploy();
    await soulBondS.deployed();
    // console.log(`SB-S Address: ${soulBondS.address}`)
  
    const SoulBondA = await hre.ethers.getContractFactory("SoulBondA",metaMaskSigner);
    const soulBondA = await SoulBondA.deploy();
    await soulBondA.deployed();
    // console.log(`SB-A Address: ${soulBondA.address}`)
  
    const SoulBondB = await hre.ethers.getContractFactory("SoulBondB",metaMaskSigner);
    const soulBondB = await SoulBondB.deploy();
    await soulBondB.deployed();
    // console.log(`SB-B Address: ${soulBondB.address}`)
  
    const SoulBondC = await hre.ethers.getContractFactory("SoulBondC",metaMaskSigner);
    const soulBondC = await SoulBondC.deploy();
    await soulBondC.deployed();
    // console.log(`SB-C Address: ${soulBondC.address}`)
  
    const SoulBondD = await hre.ethers.getContractFactory("SoulBondD",metaMaskSigner);
    const soulBondD = await SoulBondD.deploy();
    await soulBondD.deployed();
    // console.log(`SB-D Address: ${soulBondD.address}`)

    //sbLending Contract Setup:
     //adding SoulBondTokens
    await sbLending.addSoulBondToken(soulBondS.address, 1,7);
    await sbLending.addSoulBondToken(soulBondA.address, 2,5);
    await sbLending.addSoulBondToken(soulBondB.address, 3,3);
    await sbLending.addSoulBondToken(soulBondC.address, 4,2);
    await sbLending.addSoulBondToken(soulBondD.address, 5,1);

    //Adding Oracles(WETH only)
    await sbLending.addOracle(wethToken.address,WETHOracleAddress);
    await sbLending.addOracle(daiToken.address,DaiOracleAddress);
    await sbLending.addOracle(sblToken.address,SBLOracleAddress);

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


    let approveAmount = hre.ethers.utils.parseEther('100000');
    await wethToken.approve(sbLending.address,approveAmount);
    const WETHallowance = await wethToken.allowance(metaMaskUserAddress,sbLending.address);

    await daiToken.approve(sbLending.address,approveAmount);
    const DaiAllowance = await daiToken.allowance(metaMaskUserAddress,sbLending.address);

    await sblToken.approve(sbLending.address,approveAmount);
    const SblAllowance = await sblToken.allowance(metaMaskUserAddress,sbLending.address);

    //Mint and Check Balances;
    await wethToken.mint(approveAmount);
    await daiToken.mint(approveAmount);
    await sblToken.mint(approveAmount);

    // console.log(`WETHBalance: ${await wethToken.balanceOf(metaMaskUserAddress)}`)
    // console.log(`DaiBalance: ${await daiToken.balanceOf(metaMaskUserAddress)}`)
    // console.log(`SBLBalance: ${await sblToken.balanceOf(metaMaskUserAddress)}`)

  });

  it("Check Lending", async function () {
    const WETHallowance = await wethToken.allowance(metaMaskUserAddress,sbLending.address);
    // console.log(`WETH Allowance: ${hre.ethers.utils.formatEther(WETHallowance)} to: ${sbLending.address}`);

    const DaiAllowance = await daiToken.allowance(metaMaskUserAddress,sbLending.address);
    // console.log(`Dai Allowance: ${hre.ethers.utils.formatEther(DaiAllowance)} to: ${sbLending.address}`);

    const SblAllowance = await sblToken.allowance(metaMaskUserAddress,sbLending.address);
    // console.log(`SBL Allowance: ${hre.ethers.utils.formatEther(SblAllowance)} to: ${sbLending.address}`);

    assert(WETHallowance>0 && DaiAllowance>0 && SblAllowance>0);

  });



  it("Check Deposit", async function () {
    const depositAmount = hre.ethers.utils.parseEther('100');
    await sbLending.depositERC20(wethToken.address,depositAmount);
    await sbLending.depositERC20(daiToken.address,depositAmount);
    await sbLending.depositERC20(sblToken.address,depositAmount);
  
    const WETHdepositBalance = await sbLending.ERC20DepositList(wethToken.address,metaMaskUserAddress);
    const DAIdepositBalance = await sbLending.ERC20DepositList(daiToken.address,metaMaskUserAddress);
    const SBLdepositBalance = await sbLending.ERC20DepositList(sblToken.address,metaMaskUserAddress);

    // console.log(`Current WETH Deposit Balance: ${hre.ethers.utils.formatEther(WETHdepositBalance)}`);
    // console.log(`Current Dai Deposit Balance: ${hre.ethers.utils.formatEther(DAIdepositBalance)}`);
    // console.log(`Current SBL Deposit Balance: ${hre.ethers.utils.formatEther(SBLdepositBalance)}`);

    assert(WETHdepositBalance>0 && DAIdepositBalance>0 && SBLdepositBalance>0);
  });

  it("Check Deposit & Withdraw", async function () {

    const withdrawAmount = hre.ethers.utils.parseEther('50');
    await sbLending.withdrawERC20(wethToken.address,withdrawAmount);
    await sbLending.withdrawERC20(daiToken.address,withdrawAmount);
    await sbLending.withdrawERC20(sblToken.address,withdrawAmount);

    const WETHdepositBalance2 = hre.ethers.utils.formatEther(await sbLending.ERC20DepositList(wethToken.address,metaMaskUserAddress));
    const DAIdepositBalance2 = hre.ethers.utils.formatEther(await sbLending.ERC20DepositList(daiToken.address,metaMaskUserAddress));
    const SBLdepositBalance2 = hre.ethers.utils.formatEther(await sbLending.ERC20DepositList(sblToken.address,metaMaskUserAddress));

  
    // console.log(`Current WETH Deposit Balance After Withdraw: ${WETHdepositBalance2}`);
    // console.log(`Current Dai Deposit Balance After Withdraw: ${DAIdepositBalance2}`);
    // console.log(`Current Dai Deposit Balance After Withdraw: ${SBLdepositBalance2}`);

    assert(SBLdepositBalance2>=50 && DAIdepositBalance2>=50 && SBLdepositBalance2>=50);
    
  });
  //Correct Math on Contract
  it("Test Function calculateMaxBorrow(address _user)", async function () {
    const totalDeposit = hre.ethers.utils.formatEther(await sbLending.calculateTotalDeposit(metaMaskUserAddress));
    const maxBorrow= hre.ethers.utils.formatEther(await sbLending.calculateMaxBorrow(metaMaskUserAddress));
    const balanceSBS= await soulBondS.balanceOf(metaMaskUserAddress);
    const maxBorrowPercentage = await sbLending.calculateMaxBorrowPercentage(metaMaskUserAddress);

    // console.log(`SBS Balance: ${balanceSBS}`);
    // console.log(`Total Deposit: ${totalDeposit}`);
    // console.log(`Max Borrow: ${maxBorrow}`);

    assert(maxBorrow>=0 && maxBorrow<=totalDeposit*maxBorrowPercentage);
  });
  it("Test Borrow Function", async function () {
    //Test borrowERC20(address _token, uint256 _value) and check ERC20BorrowList[_token][_userAddress] balance

    const borrowAmount = hre.ethers.utils.parseEther('15');
    await sbLending.borrowERC20(wethToken.address,borrowAmount);
    await sbLending.borrowERC20(daiToken.address,borrowAmount);
    await sbLending.borrowERC20(sblToken.address,borrowAmount);


    const WETHborrowBalance = hre.ethers.utils.formatEther(await sbLending.ERC20BorrowList(wethToken.address,metaMaskUserAddress));
    const DaiBorrowBalance = hre.ethers.utils.formatEther(await sbLending.ERC20BorrowList(daiToken.address,metaMaskUserAddress));
    const SBLBorrowBalance = hre.ethers.utils.formatEther(await sbLending.ERC20BorrowList(sblToken.address,metaMaskUserAddress));


    // console.log(`Current WETH Borrow Balance Before Payback: ${WETHborrowBalance}`);
    // console.log(`Current Dai Borrow Balance Before Payback: ${DaiBorrowBalance}`);
    // console.log(`Current SBL Borrow Balance Before Payback: ${SBLBorrowBalance}`);

    assert(WETHborrowBalance>14 && DaiBorrowBalance>14 && SBLBorrowBalance>14 );
    
  });
  it("Test PayBack Function", async function () {
    //Test payBackERC20(address _token, uint256 _value)

    const payBackAmount = hre.ethers.utils.parseEther('5');
    await sbLending.payBackERC20(wethToken.address,payBackAmount);
    await sbLending.payBackERC20(daiToken.address,payBackAmount);
    await sbLending.payBackERC20(sblToken.address,payBackAmount);
    const WETHborrowBalance2 = hre.ethers.utils.formatEther(await sbLending.ERC20BorrowList(wethToken.address,metaMaskUserAddress));
    const DaiBorrowBalance = hre.ethers.utils.formatEther(await sbLending.ERC20BorrowList(wethToken.address,metaMaskUserAddress));
    const SBLBorrowBalance = hre.ethers.utils.formatEther(await sbLending.ERC20BorrowList(wethToken.address,metaMaskUserAddress));

    // console.log(`Current WETH Borrow Balance After Payback: ${WETHborrowBalance2}`);
    // console.log(`Current WETH Borrow Balance After Payback: ${WETHborrowBalance2}`);
    // console.log(`Current WETH Borrow Balance After Payback: ${WETHborrowBalance2}`);

    assert(WETHborrowBalance2<11 && DaiBorrowBalance<11 && SBLBorrowBalance<11 );
  });

  it("Test LiquidateCall Function - Payback ETH get ETH back", async function(){
    const payBackAmount = hre.ethers.utils.parseEther('10');
    const WETHborrowBeforeLiquidation = hre.ethers.utils.formatEther(await sbLending.ERC20BorrowList(wethToken.address,metaMaskUserAddress));
    const WETHdepositBeforeLiquidation = hre.ethers.utils.formatEther(await sbLending.ERC20DepositList(wethToken.address,metaMaskUserAddress));
    await sbLending.liquidationCall(wethToken.address,wethToken.address,metaMaskUserAddress,payBackAmount);
    const WETHborrowAfterLiquidation = hre.ethers.utils.formatEther(await sbLending.ERC20BorrowList(wethToken.address,metaMaskUserAddress));
    const WETHdepositAfterLiquidation = hre.ethers.utils.formatEther(await sbLending.ERC20DepositList(wethToken.address,metaMaskUserAddress));
  
    // console.log(`Borrow Before Liquidation ${WETHborrowBeforeLiquidation}`);
    // console.log(`Borrow After Liquidation ${WETHborrowAfterLiquidation}`);
    // console.log(`Deposit Before Liquidation ${WETHdepositBeforeLiquidation}`);
    // console.log(`Deposit After Liquidation ${WETHdepositAfterLiquidation}`);

    assert(WETHdepositAfterLiquidation<WETHdepositBeforeLiquidation && WETHborrowBeforeLiquidation>WETHborrowAfterLiquidation);
  

  });

  // it("Current Health", async function(){
  //   const borrowAmount = hre.ethers.utils.parseEther('10');
  //   await sbLending.borrowERC20(wethToken.address,borrowAmount);    
  //   const WETHborrowBeforeLiquidation = hre.ethers.utils.formatEther(await sbLending.ERC20BorrowList(wethToken.address,metaMaskUserAddress));
  //   const WETHdepositBeforeLiquidation = hre.ethers.utils.formatEther(await sbLending.ERC20DepositList(wethToken.address,metaMaskUserAddress));
  //   const currentHealth = await sbLending.calculateCollateralPercentage(metaMaskUserAddress);
  //   const totalDeposit = await sbLending.calculateTotalDeposit(metaMaskUserAddress);
  //   const totalBorrow = await sbLending.calculateTotalBorrowed(metaMaskUserAddress);
  
  //   // console.log(`Borrow Before Liquidation ${WETHborrowBeforeLiquidation}`);
  //   // console.log(`Deposit Before Liquidation ${WETHdepositBeforeLiquidation}`);
  //   // console.log(currentHealth);
  //   // console.log(totalDeposit);
  //   // console.log(totalBorrow);

  //   assert(true);
  

  // });

  


});
