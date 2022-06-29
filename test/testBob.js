const { expect } = require("chai");
const { assert } = require("console");
const { ethers } = require("hardhat");
const { deployProtocol } = require("../utils/deploymentHelpers");

describe("Alice", function () {
  let metaMaskSigner;
  let wethToken;
  let daiToken;
  let bob;
  let sbLending;
  let depositorSigner;
  let soulBondS;
  let soulBondD;
  let aliceTotalDeposit;
  let bobTotalDeposit;
  let bobDTokensNumber;
  let aliceSTokensNumber;
  
  let aliceDaiDeposited = ethers.utils.parseEther('100');
  let bobWethDeposited = ethers.utils.parseEther('100');

  const bobWethDeposit = ethers.utils.parseEther("5");

  const approveAmount = ethers.utils.parseEther('100000');

  let aliceSigner;
  let bobSigner;

  before("", async function () {
    ({ wethToken, daiToken, sbLending, metaMaskSigner, soulBondS, soulBondD } =
      await deployProtocol());

    aliceSigner = await hre.ethers.getSigner();
    bobSigner = await hre.ethers.getSigner();

    let aliceAddress = aliceSigner.address;
    let bobAddress = bobSigner.address;

    await hre.ethers.provider.send("hardhat_setBalance", [
      aliceSigner.address,
      ethers.utils
        .parseUnits("1000", "ether")
        .toHexString()
        .replace("0x0", "0x"),
    ]);

    await hre.ethers.provider.send("hardhat_setBalance", [
      bobSigner.address,
      ethers.utils
        .parseUnits("1000", "ether")
        .toHexString()
        .replace("0x0", "0x"),
    ]);

  

    await daiToken.connect(aliceSigner).mint(ethers.utils.parseEther("100"));

    await soulBondS.connect(metaMaskSigner).mint(aliceSigner.address)

    await daiToken.connect(aliceSigner).approve(sbLending.address, approveAmount);

    console.log('100 dai = ' + ethers.utils.parseEther('100'))
    await sbLending.connect(aliceSigner).depositERC20(daiToken.address, aliceDaiDeposited);

    aliceTotalDeposit = await sbLending.calculateTotalDeposit(aliceSigner.address);
    console.log(`Alice Total Deposit: ${aliceTotalDeposit}`)

    aliceSTokensNumber = await soulBondS.balanceOf(aliceSigner.address) // > 0;
    console.log("Alice NFT: "+ aliceSTokensNumber);
    console.log();

    console.log(await sbLending.ERC20DepositList(daiToken.address, aliceAddress));
    console.log();
    

    await wethToken.connect(bobSigner).mint(ethers.utils.parseEther("5"));
    
    await soulBondD.connect(metaMaskSigner).mint(bobSigner.address)

    await wethToken.connect(bobSigner).approve(sbLending.address, approveAmount);

    console.log('5 WETH = ' + ethers.utils.parseEther('5000'))
    await sbLending.connect(bobSigner).depositERC20(wethToken.address, bobWethDeposited);

    bobTotalDeposit = await sbLending.calculateTotalDeposit(bobSigner.address);
    console.log(`Bob Total Deposit: ${bobTotalDeposit}`)

    bobDTokensNumber = await soulBondD.balanceOf(bobSigner.address)
    console.log("Bob NFT: "+ bobDTokensNumber);
    console.log();

    console.log(await sbLending.ERC20DepositList(wethToken.address, bobAddress));
    console.log();
    

    

    // const ETHWhale = "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8";

    // //Impersonate Whale
    // await hre.network.provider.request({
    //   method: "hardhat_impersonateAccount",
    //   params: [ETHWhale],
    // });

    // const ETHsigner = await hre.ethers.getSigner(ETHWhale);

    // //send ETH
    // await ETHsigner.sendTransaction({
    //   to: bobAddress,
    //   value: hre.ethers.utils.parseEther("5"),
    // });

    // //Ethereum Mainnet Oracles
    // const WETHOracleAddress = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
    // const DaiOracleAddress = "0xaed0c38402a5d19df6e4c03f4e2dced6e29c1ee9";
    // //Address to be used in Metamask
    // await hre.network.provider.request({
    //   method: "hardhat_impersonateAccount",
    //   params: [bobAddress],
    // });
    // metaMaskSigner = await hre.ethers.getSigner(bobAddress);

    // //ERC20 Tokens Deployment

    // const SbLending = await hre.ethers.getContractFactory(
    //   "SbLending",
    //   metaMaskSigner
    // );
    // sbLending = await SbLending.deploy();
    // await sbLending.deployed();
    // console.log(`SoulBond Lending Contract: ${sbLending.address}`);

    // const DaiToken = await hre.ethers.getContractFactory(
    //   "DaiToken",
    //   metaMaskSigner
    // );
    // daiToken = await DaiToken.deploy();
    // await daiToken.deployed();
    // console.log(`DaiToken Address: ${daiToken.address}`);

    // const WETHToken = await hre.ethers.getContractFactory(
    //   "WETHToken",
    //   metaMaskSigner
    // );
    // wethToken = await WETHToken.deploy();
    // await wethToken.deployed();
    // console.log(`WETHToken Address: ${wethToken.address}`);

    // //Adding Oracles(WETH only)
    // await sbLending.addOracle(wethToken.address, WETHOracleAddress);
    // await sbLending.addOracle(daiToken.address, DaiOracleAddress);

    // //Adding Deposit Tokens
    // await sbLending.addDepositToken(wethToken.address);

    // //Adding Borrow Tokens
    // await sbLending.addBorrowToken(wethToken.address);
    // await sbLending.addBorrowToken(daiToken.address);

    // //Adding Interest Rates
    // await sbLending.addTokenInterestFixedInterestRate(wethToken.address, 7);
    // await sbLending.addTokenInterestFixedInterestRate(daiToken.address, 9);

    // //Approve Tokens

    // let bobApprovedAmount = hre.ethers.utils.parseEther("5500");

    // await daiToken.approve(sbLending.address, bobApprovedAmount);
    // const DaiAllowance = await daiToken.allowance(
    //   bobAddress,
    //   sbLending.address
    // );

    // //Mint and Check Balances;
    // await daiToken.mint(bobApprovedAmount);

    // console.log(`DaiBalance: ${await daiToken.balanceOf(bobAddress)}`);

    // const bobAddress = ethers.utils.getContractAddress({
    //   from: depositorAddr,
    //   nonce: (await ethers.provider.getTransactionCount(depositorAddr)) + 1,
    // });
  });

  // it("should hold Dai", async function () {
  //   const balance = await dai.balanceOf(sbLending.address);
  //   assert.equal(balance.toString(), deposit.toString());
  // });

  // describe("Should not allow to borrow 5501 dai", () => {
  //   it("should not allow the borrowed amount", async () => {
  //     let ex;
  //     try {
  //       const signer = await ethers.provider.getSigner(beneficiary);
  //       await escrow.connect(signer).approve();
  //     } catch (_ex) {
  //       ex = _ex;
  //     }
  //     assert(ex, "expected the transaction to revert");
  //   });
  // });
  it("Alice should have some Dai", async function () {
    daiPrice = await sbLending.getLatestPrice(daiToken.address);
    assert(aliceTotalDeposit.toString() === (daiPrice * 100).toString());
  });

  it("Bob should have WETH", async function () {
    wethPrice = await sbLending.getLatestPrice(wethToken.address);
    assert(bobTotalDeposit.toString() === (wethPrice * 100).toString());
  });
  
    it("Alice should have deposited some DAI", async function () {
      const balance = await daiToken.balanceOf(aliceAddress);
        assert.equal(balance.toString(), aliceTotalDeposit.tostring());
    });

    it("Bob should have deposited some WETH", async function () {
      const balance = await wethToken.balanceOf(bobAddress);
        assert.equal(balance.toString(), bobTotalDeposit.tostring());
    });

    it("Alice should have a Sould Bond S NFT", async function () {
      soulBondS = await soulBondS.balanceOf(aliceAddress);
      assert(soulBondS.toString()>0);
    });

    it("Bob should have a Soul Bond D NFT", async function () {
      soulBondD = await soulBondD.balanceOf(bobAddress);
      assert(soulBondD.toString()>0);
    });

    it("Alice shouldn't be able to transfer her NFT", async function () {
      soulBondS = await soulBondS.balanceOf(aliceAddress);
      let ex;
       try {
            let tryingTransfer= await soulBondS.transferFrom(aliceAddress, bobAddress, aliceSTokensNumber)
           } catch (_ex) {
         ex = _ex;
         }
           assert(ex, "expected the transaction to revert");
         });

    it("Bob shouldn't be able to transfer his NFT", async function () {
      soulBondD = await soulBondD.balanceOf(bobAddress);
      let ex;
       try {
            let tryingTransfer= await soulBondB.transferFrom(bobAddress, bobAddress, bobDTokensNumber)
           } catch (_ex) {
         ex = _ex;
         }
           assert(ex, "expected the transaction to revert");
         });

    it("Alice should be able to borrow max amount", async function () {
      daiPrice = await sbLending.getLatestPrice(daiToken.address);
      maxAmount= daiPrice/18 * aliceTotalDeposit * 90/100
      
      assert(aliceTotalDeposit.toString()<= maxAmount.toString());
    });

    it("Bob should be able to borrow max amount", async function () {
        wethPrice = await sbLending.getLatestPrice(daiToken.address);
        maxAmount= wethPrice/18 * bobTotalDeposit * 70/100
        
        assert(bobTotalDeposit.toString()<= maxAmount.toString());
    });
    
    it("Alice should not be able to borrow above max amount", async function () {
      daiPrice = await sbLending.getLatestPrice(daiToken.address);
      maxAmount= daiPrice/18 * aliceTotalDeposit * 90/100
      try{
        
      let aboveMaxAmount= daiPrice/18 * aliceTotalDeposit * 70/100+1
      let bobTryingAmount= await sbLending.borrowERC20(daiToken.address, aboveMaxAmount)
        } catch (_ex){
          ex=_ex;
            }
      assert(ex, "expected the transaction to revert");
      
    });
    
    it("Bob should not be able to borrow above max amount", async function () {
      wethPrice = await sbLending.getLatestPrice(daiToken.address);

      try{
      let aboveMaxAmount= wethPrice/18 * bobTotalDeposit * 70/100+1
      let bobTryingAmount= await sbLending.borrowERC20(WethToken.address, aboveMaxAmount)
} catch (_ex){
  ex=_ex;
}
      assert(ex, "expected the transaction to revert");
      
    });

  
});
