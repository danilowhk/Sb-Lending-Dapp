// import React, { useEffect } from 'react';
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import Modal from "react-modal";
import { NewDepositModal } from "./components/NewDepositModal";
import { NewBorrowModal } from "./components/NewBorrowModal";
import { ethers } from "ethers";
import sbLendingArtifact from "./contracts/contracts/sbLending-V0.sol/sbLending.json";
import WETHArtifact from "./contracts/contracts/WETH.sol/WETHToken.json";
import SoulBondSArtifact from "./contracts/contracts/SoulBondS.sol/SoulBondS.json";
import { BigNumber } from "ethers";

import { useState, useEffect } from "react";
import { GlobalStyle } from "./styles/global";

Modal.setAppElement("#root");

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [isDepositModal, setIsDepositModal] = useState(false);
  const [isBorrowModal, setIsBorrowModal] = useState(false);
  const [signer, setSigner] = useState<any>("");
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState<any>();
  const [contract, setContract] = useState("contract");
  //contracts states;
  const [WETHContract, setWETHContract] = useState<any>();
  const [DaiContract, setDaiContract] = useState<any>();
  const [SBLContract, setSBLContract] = useState<any>();
  const [SbLendingContract, setSbLendingContract] = useState<any>();

  //Balances States;
  const [WETHData, setWETHData] = useState<any>({
    name: "WETH",
    price: 0,
    depositBalance: 0,
    borrowBalance: 0,
  });
  const [DaiData, setDaiData] = useState<any>({
    name: "Dai",
    price: 0,
    depositBalance: 0,
    borrowBalance: 0,
  });
  const [SBLData, setSBLData] = useState<any>({
    name: "SBL",
    price: 0,
    depositBalance: 0,
    borrowBalance: 0,
  });
  //SoulBond List State
  const [SoulBondData, setSoulBondData] = useState<any>({
    sClass: 0,
    aClass: 0,
    bClass: 0,
    cClass: 0,
    dClass: 0,
  });

  const [totalDepositBalance, setTotalDepositBalance] = useState<any>(0);
  const [totalBorrowBalance, setTotalBorrowBalance] = useState<any>(0);
  const [currentHealthFactor, setCurrentHealthFactor] = useState<any>(0);
  const [maxCollateralFactor, setMaxCollateralFactor] = useState<any>(70);

  //Lending Pool and ERC20 Tokens Contracts
  const SbLendingAddress = "0xAF451392f7524CF76240FD886C924A5041b8fb6d";
  const WETHAddress = "0x7B99CBF7300B1208B64Fa648435d26b2116991e8";
  const DAIAddress = "0x8a8c52A98a67f8e762482B6B17B9a17fcEe46352";
  const SBLAddress = "0xc2C2A117B4f9fd7d73FB7695E075216dC0348FBC";

  //SoulBond Tokens Address
  const soulBondSAddress = "0x2582aF53CecF9cEe6160077316DB28CD7e12605B";
  const soulBondAAddress = "0xC3e6ef6f95a62d1aD519e972A3fc2A9E85d6368C";
  const soulBondBAddress = "0x47d1E92850Da99A276D21acDA4e19CdD3f9C4a7b";
  const soulBondCAddress = "0x8736a26f368e34feA06C259dd271C79C13f38EF1";
  const soulBondDAddress = "0xab573EC236CAf73d48cCFB00C116943A15be7f35";

  const ERC20Abi = WETHArtifact.abi;
  const sbLendingAbi = sbLendingArtifact.abi;

  async function connectWallet() {
    const { ethereum } = window;
    if (ethereum && !isConnected) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      await ethereum.request({ method: "eth_requestAccounts" });
      const signer = provider.getSigner();
      setSigner(signer);
      setProvider(provider);
      setIsConnected(true);
   
      // console.log("Getting Pool Data")
    } else {
    }
  }

  async function getPoolsData() {
    if (signer) {
      const sbLending = new ethers.Contract(
        SbLendingAddress,
        sbLendingArtifact.abi,
        signer
      );
      const userAddress = await signer.getAddress();

      const WETHPrice = ethers.utils.formatEther(
        await sbLending.getLatestPrice(WETHAddress)
      );
      const DaiPrice = ethers.utils.formatEther(
        await sbLending.getLatestPrice(DAIAddress)
      );
      const SblPrice = ethers.utils.formatEther(
        await sbLending.getLatestPrice(SBLAddress)
      );

      const WETHDepositBalance = (
        await sbLending.ERC20DepositList(WETHAddress, userAddress)
      ).toString();
      const DaiDepositBalance = (
        await sbLending.ERC20DepositList(DAIAddress, userAddress)
      ).toString();
      const SblDepositBalance = (
        await sbLending.ERC20DepositList(SBLAddress, userAddress)
      ).toString();

      const WETHBorrowBalance = (
        await sbLending.ERC20BorrowList(WETHAddress, userAddress)
      ).toString();
      const DaiBorrowBalance = (
        await sbLending.ERC20BorrowList(DAIAddress, userAddress)
      ).toString();
      const SblBorrowBalance = (
        await sbLending.ERC20BorrowList(SBLAddress, userAddress)
      ).toString();

      const totalDepositBalanceData = ethers.utils.formatEther(
        await sbLending.calculateTotalDeposit(userAddress)
      );
      const totalBorrowBalanceData = ethers.utils.formatEther(
        await sbLending.calculateTotalBorrowed(userAddress)
      );
      const maxCollateralPercentage = (
        await sbLending.calculateMaxBorrowPercentage(userAddress)
      ).toString();
      const currentHealthFactor = (
        await sbLending.calculateCollateralPercentage(userAddress)
      ).toNumber();

      setTotalDepositBalance(totalDepositBalanceData);
      setTotalBorrowBalance(totalBorrowBalanceData);
      setCurrentHealthFactor(currentHealthFactor/100);
      setMaxCollateralFactor(maxCollateralPercentage);

      console.log(`WETH Deposit Balance: ${WETHDepositBalance}`);
      console.log(`Dai Deposit Balance: ${DaiDepositBalance}`);
      console.log(`SBL Deposit Balance: ${SblDepositBalance}`);

      setWETHData({
        name: WETHData.name,
        depositBalance: WETHDepositBalance,
        price: WETHPrice,
        borrowBalance: WETHBorrowBalance,
      });

      setDaiData({
        name: DaiData.name,
        depositBalance: DaiDepositBalance,
        price: DaiPrice,
        borrowBalance: DaiBorrowBalance,
      });

      setSBLData({
        name: SBLData.name,
        depositBalance: SblDepositBalance,
        price: SblPrice,
        borrowBalance: SblBorrowBalance,
      });
    }
  }

  async function getSoulBondData() {
    if (signer) {
      //Add SoulBond Artifacts
      const userAddress = await signer.getAddress();

      const sClassToken = new ethers.Contract(soulBondSAddress,SoulBondSArtifact.abi,signer);
      const aClassToken = new ethers.Contract(soulBondAAddress,SoulBondSArtifact.abi,signer);
      const bClassToken = new ethers.Contract(soulBondBAddress,SoulBondSArtifact.abi,signer);
      const cClassToken = new ethers.Contract(soulBondCAddress,SoulBondSArtifact.abi,signer);
      const dClassToken = new ethers.Contract(soulBondDAddress,SoulBondSArtifact.abi,signer);
      // console.log("SClass Token!");
      // console.log(sClassToken);

      const sClass = await sClassToken.balanceOf(userAddress);
      const aClass = await aClassToken.balanceOf(userAddress);
      const bClass = await bClassToken.balanceOf(userAddress);
      const cClass = await cClassToken.balanceOf(userAddress);
      const dClass = await dClassToken.balanceOf(userAddress);
      console.log("SClass Token!");
      console.log(aClass);

      // console.log(SoulBondData);


      setSoulBondData({
        sClass: sClass,
        aClass: aClass,
        bClass: bClass,
        cClass: cClass,
        dClass: dClass,
      });

    }
  }

  function handleOpenDepositModal(contract: any) {
    setIsDepositModal(true);
    setContract(contract);
  }

  function handleCloseDepositModal() {
    setIsDepositModal(false);
  }

  function handleOpenBorrowModal(contract: any) {
    setIsBorrowModal(true);
    setContract(contract);
  }

  function handleCloseBorrowModal() {
    setIsBorrowModal(false);
  }
  useEffect(() => {
    getPoolsData();
    getSoulBondData();
   
  });

  return (
    <>
      <Header onConnectWallet={connectWallet} onIsConnected={isConnected} />

      <Dashboard
        onOpenDepositModal={handleOpenDepositModal}
        onOpenBorrowModal={handleOpenBorrowModal}
        provider={provider}
        signer={signer}
        WETHData={WETHData}
        DaiData={DaiData}
        SBLData={SBLData}
        totalDepositBalance={totalDepositBalance}
        totalBorrowBalance={totalBorrowBalance}
        maxCollateralFactor={maxCollateralFactor}
        currentHealthFactor={currentHealthFactor}
        SoulBondData={SoulBondData}
      />
      <NewDepositModal
        isOpen={isDepositModal}
        onRequestClose={handleCloseDepositModal}
        contract={contract}
        provider={provider}
        signer={signer}
        ERC20Abi={ERC20Abi}
        sbLendingAbi={sbLendingAbi}
      />
      <NewBorrowModal
        isOpen={isBorrowModal}
        onRequestClose={handleCloseBorrowModal}
        contract={contract}
        provider={provider}
        signer={signer}
        ERC20Abi={ERC20Abi}
        sbLendingAbi={sbLendingAbi}
      />
      <GlobalStyle />
    </>
  );
}

export default App;
