const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {

  before('', async function(){
    const SbLending = await hre.ethers.getContractFactory("sbLending");
    const sbLending = await SbLending.deploy();
  
    await sbLending.deployed();
  
    console.log("sbLending deployed to:", sbLending.address);

  });
  it("Should Deposit Balance for WETH", async function () {

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
  it("Should Withdraw Balance for WETH", async function () {

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
  it("Should Borrow Balance for WETH", async function () {

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });

  it("Should Payback Balance for WETH", async function () {

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });

  it("Should Liquidate WETH", async function () {

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });


});
