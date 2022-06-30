//In this file we are testing Approve / Deposit / Withdraw / Borrow / Payback / Liquidate
const ethers = require("hardhat");
const { BigNumber } = require("ethers");
const sbsArtifact = require("../sb-lending/src/contracts/contracts/SoulBondS.sol/SoulBondS.json");
const { addresses } = require("../utils/deploymentHelpers");
const { hrtime } = require("process");

async function main(){

    const metaMaskUserAddress='0xd770134156f9aB742fDB4561A684187f733A9586';
    const sbcContractAddress ="0x8736a26f368e34feA06C259dd271C79C13f38EF1"

    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [metaMaskUserAddress],
    });

    const metaMaskSigner = await hre.ethers.getSigner(metaMaskUserAddress);

    
    const sbcContract = new hre.ethers.Contract(sbcContractAddress, sbsArtifact.abi,metaMaskSigner)

    const balanceBeforeMint = await sbcContract.balanceOf(metaMaskUserAddress);

    const tx = await sbcContract.mint(metaMaskUserAddress);

    await tx.wait();

    const balanceAfterMint = await sbcContract.balanceOf(metaMaskUserAddress);

    console.log(`Before Mint: ${balanceBeforeMint}`);
    console.log(`After Mint: ${balanceAfterMint}`);

    
}

main();