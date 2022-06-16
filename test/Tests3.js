const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {

  before('', async function(){
    const SbLending = await hre.ethers.getContractFactory("sbLending");
    const sbLending = await SbLending.deploy();
  
    await sbLending.deployed();
  
    console.log("sbLending deployed to:", sbLending.address);

  });

  it("Should check SoulBond Tokens and allow a higher Borrow from same Collateral", async function () {

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
  it("Should not liquidate address with SoulBond Tokens", async function () {

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
  it("Should update Balance with Interest Rate", async function () {

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
  it("Should Allow Liquidation after Interest Rate rise", async function () {

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });







});
