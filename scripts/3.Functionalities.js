//In this file we are testing Approve / Deposit / Withdraw / Borrow / Payback / Liquidate
const ethers = require("hardhat");
const { BigNumber } = require("ethers");
const WETHArtifact = require('../sb-lending/src/contracts/contracts/WETH.sol/WETHToken.json')
const sbLendingArtifact = require('../sb-lending/src/contracts/contracts/sbLending-V0.sol/sbLending.json')


async function main() {


  //Mainnet WETH, DAI, Aave Address;
  const sbLendingAddress= '0x82EdA215Fa92B45a3a76837C65Ab862b6C7564a8';
  const WETHAddress= '0x51C65cd0Cdb1A8A8b79dfc2eE965B1bA0bb8fc89';
  const DaiAddress= '0x87006e75a5B6bE9D1bbF61AC8Cd84f05D9140589';
  const SblTokenAddress= '0x8fC8CFB7f7362E44E472c690A6e025B80E406458';

  const metaMaskUserAddress='0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8';

  const WETHAbi = WETHArtifact.abi;
  const DaiAbi= WETHArtifact.abi;
  const sbLendingAbi= sbLendingArtifact.abi;

  //Checking Allowance
  //Approving transactions


  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [metaMaskUserAddress],
  });
  const metaMaskSigner = await hre.ethers.getSigner(metaMaskUserAddress);

  console.log("----GOT SIGNER!---")
  const WETHContract = new hre.ethers.Contract(WETHAddress,WETHAbi,metaMaskSigner);
  const DaiContract = new hre.ethers.Contract(DaiAddress,DaiAbi,metaMaskSigner);
  const sbLendingContract = new hre.ethers.Contract(sbLendingAddress,sbLendingAbi,metaMaskSigner);
  console.log("----GOT Contracts!---")

  let approveAmount = hre.ethers.utils.parseEther('100000');
  await WETHContract.approve(sbLendingAddress,approveAmount);
  const WETHallowance = await WETHContract.allowance(metaMaskUserAddress,sbLendingAddress);
  console.log(`WETH Allowance From: ${metaMaskUserAddress} to: ${sbLendingAddress}`);
  console.log(`WETH Allowance: ${WETHallowance}`);

  await DaiContract.approve(sbLendingAddress,approveAmount);
  const DaiAllowance = await DaiContract.allowance(metaMaskUserAddress,sbLendingAddress);
  console.log(`Dai Allowance: ${metaMaskUserAddress} to: ${sbLendingAddress}`);
  console.log(`Dai Allowance: ${DaiAllowance}`);
  console.log("----approved---")

  //mint ERC20;
  await WETHContract.mint(approveAmount);
  await DaiContract.mint(approveAmount);
  console.log(`WETHBalance: ${await WETHContract.balanceOf(metaMaskUserAddress)}`)
  console.log(`DaiBalance: ${await DaiContract.balanceOf(metaMaskUserAddress)}`)



  
  //Deposit
  const depositAmount = hre.ethers.utils.parseEther('10');
  console.log("----------Before Tx!");
  await sbLendingContract.depositERC20(WETHAddress,depositAmount,{gasLimit: 300000});
  await sbLendingContract.depositERC20(DaiAddress,depositAmount,{gasLimit: 300000});

  const WETHdepositBalance = await sbLendingContract.ERC20DepositList(WETHAddress,metaMaskUserAddress);
  const DAIdepositBalance = await sbLendingContract.ERC20DepositList(DaiAddress,metaMaskUserAddress);

  console.log(`Current WETH Deposit Balance Before Withdraw: ${WETHdepositBalance}`);
  console.log(`Current Dai Deposit Balance: ${DAIdepositBalance}`);

  //Withdraw
  const withdrawAmount = hre.ethers.utils.parseEther('3');
  await sbLendingContract.withdrawERC20(WETHAddress,withdrawAmount,{gasLimit: 300000});
  await sbLendingContract.depositERC20(DaiAddress,withdrawAmount,{gasLimit: 300000});

  const WETHdepositBalance2 = await sbLendingContract.ERC20DepositList(WETHAddress,metaMaskUserAddress);
  const DAIdepositBalance2 = await sbLendingContract.ERC20DepositList(DaiAddress,metaMaskUserAddress);

  console.log(`Current WETH Deposit Balance After Withdraw: ${WETHdepositBalance2}`);
  console.log(`Current Dai Deposit Balance After Withdraw: ${DAIdepositBalance2}`);

  //Borrow
  const borrowAmount = hre.ethers.utils.parseEther('1');
  await sbLendingContract.borrowERC20(WETHAddress,borrowAmount,{gasLimit: 300000});
  const WETHborrowBalance = await sbLendingContract.ERC20BorrowList(WETHAddress,metaMaskUserAddress);
  console.log(`Current WETH Borrow Balance Before Payback: ${WETHborrowBalance}`);














  



  //Borrow
  //PayBack
  //Liquidate


  
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
