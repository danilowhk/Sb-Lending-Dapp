const { expect } = require("chai");
const { assert } = require("console");
const { ethers } = require("hardhat");
const deployProtocol = require("../utils/deploymentHelpers");

describe("sbLending", function () {
  let metaMaskUserAddress;
  let metaMaskSigner;
  let sbLending;
  let wethToken;
  let daiToken;
  let sblToken;
  let soulBondS;

  before('', async function() {
    ({ metaMaskUserAddress, _, sbLending, wethToken,
      daiToken, sblToken, soulBondS } = await deployProtocol());
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

    assert(SBLdepositBalance2>50 && DAIdepositBalance2>50 && SBLdepositBalance2>50);
    
  });
  //Correct Math on Contract
  it("Test Function calculateMaxBorrow(address _user)", async function () {
    const totalDeposit = hre.ethers.utils.formatEther(await sbLending.calculateTotalDeposit(metaMaskUserAddress));
    const maxBorrow= hre.ethers.utils.formatEther(await sbLending.calculateMaxBorrow(metaMaskUserAddress));
    const balanceSBS= await soulBondS.balanceOf(metaMaskUserAddress);

    // console.log(`SBS Balance: ${balanceSBS}`);
    // console.log(`Total Deposit: ${totalDeposit}`);
    // console.log(`Max Borrow: ${maxBorrow}`);

    assert(maxBorrow>0 && maxBorrow<50);
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

    assert(WETHdepositAfterLiquidation<WETHdepositBeforeLiquidation && WETHborrowBeforeLiquidation<WETHborrowAfterLiquidation);
  

  });


});
