//In this file we are testing Approve / Deposit / Withdraw / Borrow / Payback / Liquidate
const ethers = require("hardhat");
const { BigNumber } = require("ethers");
const sbsArtifact = require("../sb-lending/src/contracts/contracts/SoulBondS.sol/SoulBondS.json");
const { addresses } = require("../utils/deploymentHelpers");
const { hrtime } = require("process");

async function main(){

    const metaMaskUserAddress='0xd770134156f9aB742fDB4561A684187f733A9586';
    const sbsContractAddress ="0x2582aF53CecF9cEe6160077316DB28CD7e12605B"

    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [metaMaskUserAddress],
    });

    const metaMaskSigner = await hre.ethers.getSigner(metaMaskUserAddress);

    
    const sbsContract = new hre.ethers.Contract(sbsContractAddress, sbsArtifact.abi,metaMaskSigner)

    const balanceBeforeMint = await sbsContract.balanceOf(metaMaskUserAddress);

    const tx = await sbsContract.mint(metaMaskUserAddress);

    await tx.wait();

    const balanceAfterMint = await sbsContract.balanceOf(metaMaskUserAddress);

    console.log(`Before Mint: ${balanceBeforeMint}`);
    console.log(`After Mint: ${balanceAfterMint}`);

    
}

main();