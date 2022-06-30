//In this file we are testing Approve / Deposit / Withdraw / Borrow / Payback / Liquidate
const ethers = require("hardhat");
const { BigNumber } = require("ethers");
const sbsArtifact = require("../sb-lending/src/contracts/contracts/SoulBondS.sol/SoulBondS.json");
const { addresses } = require("../utils/deploymentHelpers");
const { hrtime } = require("process");

async function main(){

    const metaMaskUserAddress='0xd770134156f9aB742fDB4561A684187f733A9586';
    const sbdContractAddress ="0xab573EC236CAf73d48cCFB00C116943A15be7f35"

    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [metaMaskUserAddress],
    });

    const metaMaskSigner = await hre.ethers.getSigner(metaMaskUserAddress);

    
    const sbdContract = new hre.ethers.Contract(sbdContractAddress, sbsArtifact.abi,metaMaskSigner)

    const balanceBeforeMint = await sbdContract.balanceOf(metaMaskUserAddress);

    const tx = await sbdContract.mint(metaMaskUserAddress);

    await tx.wait();

    const balanceAfterMint = await sbdContract.balanceOf(metaMaskUserAddress);

    console.log(`Before Mint: ${balanceBeforeMint}`);
    console.log(`After Mint: ${balanceAfterMint}`);

    
}

main();