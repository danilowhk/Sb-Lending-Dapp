const { expect } = require("chai");
const { assert } = require("console");
const { ethers } = require("hardhat");
const { transferFunds } = require("../scripts/1.transferFundsFork");
const { deployAndSetup } = require("../scripts/2.deployAndSetup");


describe("sbLending", function () {

  before('', async function(){
    transferFunds();
    deployAndSetup();
    

  });
  it("userMaxBorrowingPower Test", async function () {
    
  });


});
