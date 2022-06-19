const { expect } = require("chai");
const { assert } = require("console");
const { ethers } = require("hardhat");

describe("sbLending", function () {

  before('', async function(){
    const SbLending = await hre.ethers.getContractFactory("sbLending");
    const sbLending = await SbLending.deploy();
  
    await sbLending.deployed();
  
    console.log("sbLending deployed to:", sbLending.address);

  });
  it("userMaxBorrowingPower Test", async function () {
    const userMaxBorrowingPower = await sbLending.calculateMaxBorrow('0xd770134156f9aB742fDB4561A684187f733A9586');
    assert(userMaxBorrowingPower>0);
  });


});
