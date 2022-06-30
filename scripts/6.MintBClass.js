//In this file we are testing Approve / Deposit / Withdraw / Borrow / Payback / Liquidate
const ethers = require("hardhat");
const { BigNumber } = require("ethers");
const sbsArtifact = require("../sb-lending/src/contracts/contracts/SoulBondS.sol/SoulBondS.json");
const { addresses } = require("../utils/deploymentHelpers");
const { hrtime } = require("process");

async function main(){

    const metaMaskUserAddress='0xd770134156f9aB742fDB4561A684187f733A9586';
    const sbbContractAddress ="0x47d1E92850Da99A276D21acDA4e19CdD3f9C4a7b"

    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [metaMaskUserAddress],
    });

    const metaMaskSigner = await hre.ethers.getSigner(metaMaskUserAddress);

    
    const sbbContract = new hre.ethers.Contract(sbbContractAddress, sbsArtifact.abi,metaMaskSigner)

    const balanceBeforeMint = await sbbContract.balanceOf(metaMaskUserAddress);

    const tx = await sbbContract.mint(metaMaskUserAddress);

    await tx.wait();

    const balanceAfterMint = await sbbContract.balanceOf(metaMaskUserAddress);

    console.log(`Before Mint: ${balanceBeforeMint}`);
    console.log(`After Mint: ${balanceAfterMint}`);

    
}

main();