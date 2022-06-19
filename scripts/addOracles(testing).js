
const ethers = require("hardhat");

async function main() {

    //lending Pool Address
    const SbLendingAddress='0xd53890360fFB710c3565c37CEE129Eb0Da8C1e96';

    //Kovan ERC20 Tokens Address
    const WETHAddress='0x8662e360188d612685362A35770f4A0657089ce0';
    const daiAddress='0xC38b6D54635327516B9aEa23664afca2a86c464a';
    const SBLAddress='0x5dd36E5c3d054C0c8D7a126bF67B7868f8537F1B';
    //Kovan SoulBond Tokens Address
    const soulBondSAddress='0x7228f2c0f1E7948024056e1bc1CC310850f46432';
    const soulBondAAddress='0xa37F2fBdd86B5A686E5733C8B838E3beC9b5d174';
    const soulBondBAddress='0xE3F6cbFad9DB22acFD4251dd87B162AffCD2ae69';
    const soulBondCAddress='0x46F411c24ffF4338Fb1f09a026Da1a3F3b764Ec5';
    const soulBondDAddress='0x43b2EeD08547671220749bFE390fF45516c49134';
    //Kovan Oracle Prices
    const WETHOracleAddress = '0x9326BFA02ADD2366b30bacB125260Af641031331';
    const SBLOracleAddress = '0x9326BFA02ADD2366b30bacB125260Af641031331';


    const SbLending = await hre.ethers.getContractFactory("sbLending");
    const sbLending= await SbLending.attach(SbLendingAddress);
    const DaiContract = await hre.ethers.getContractFactory("DaiToken");
    const daiContract= await DaiContract.attach(daiAddress);
    const WETHContract = await hre.ethers.getContractFactory("WETHToken");
    const wethContract= await WETHContract.attach(WETHContract);
    const SBLContract = await hre.ethers.getContractFactory("SblToken");
    const sblContract= await SBLContract.attach(SBLAddress);

    // const baseMaxBorrow = await sbLending.baseMaxBorrow();
    console.log("-----------before")

    // const addWETHOracle = await sbLending.addOracle(WETHAddress,WETHOracleAddress);
    // const WETHPrice = await sbLending.getLatestPrice(WETHAddress);
    await sbLending.addSoulBondToken(soulBondSAddress, 1);
    console.log("sbS added");
    
    const userMaxBorrowingPower = await sbLending.calculateMaxBorrow('0xd770134156f9aB742fDB4561A684187f733A9586');

    console.log("before10000")
    // await sbLending.addSoulBondToken(soulBondSAddress, 1);
    console.log("after")


    const userMaxBorrowingPower2 = await sbLending.calculateTotalDeposit('0xd770134156f9aB742fDB4561A684187f733A9586');



    // console.log(WETHPrice);
    console.log(`User Max Borrow Before Adding SBS Token: ${userMaxBorrowingPower}`)
    console.log(`User Max Borrow After Adding SBS Token: ${userMaxBorrowingPower2}`)



  
}

main();