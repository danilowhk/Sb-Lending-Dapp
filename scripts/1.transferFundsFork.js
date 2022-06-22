
const { BigNumber } = require("ethers");
const ethers = require("hardhat");

async function transferFunds() {

    const mainnetWETHAddress='0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';

    const transferWalletAddress = '0xd770134156f9aB742fDB4561A684187f733A9586';

    const ETHWhale = '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8';


    //Impersonate Whalee
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [ETHWhale],
    });

    const ETHsigner = await hre.ethers.getSigner(ETHWhale);
 
      //send ETH
      await ETHsigner.sendTransaction({
        to: transferWalletAddress,
        value: hre.ethers.utils.parseEther("2000") // 1000 ether
      })

} 

exports.transferFunds = transferFunds;

