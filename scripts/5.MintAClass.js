//In this file we are testing Approve / Deposit / Withdraw / Borrow / Payback / Liquidate
const ethers = require("hardhat");
const { BigNumber } = require("ethers");
const sbsArtifact = require("../sb-lending/src/contracts/contracts/SoulBondS.sol/SoulBondS.json");
const { addresses } = require("../utils/deploymentHelpers");
const { hrtime } = require("process");

async function main(){

    const metaMaskUserAddress='0xd770134156f9aB742fDB4561A684187f733A9586';
    const sbaContractAddress ="0xC3e6ef6f95a62d1aD519e972A3fc2A9E85d6368C"

    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [metaMaskUserAddress],
    });

    const metaMaskSigner = await hre.ethers.getSigner(metaMaskUserAddress);

    
    const sbaContract = new hre.ethers.Contract(sbaContractAddress, sbsArtifact.abi,metaMaskSigner)

    const balanceBeforeMint = await sbaContract.balanceOf(metaMaskUserAddress);

    const tx = await sbaContract.mint(metaMaskUserAddress);

    await tx.wait();

    const balanceAfterMint = await sbaContract.balanceOf(metaMaskUserAddress);

    console.log(`Before Mint: ${balanceBeforeMint}`);
    console.log(`After Mint: ${balanceAfterMint}`);

    
}

main();