// import React, { useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import Modal from 'react-modal';
import { NewDepositModal } from './components/NewDepositModal';
import { NewBorrowModal } from './components/NewBorrowModal';
import {ethers} from 'ethers';
import sbLendingArtifact from './contracts/contracts/sbLending-V0.sol/sbLending.json';
import WETHArtifact from './contracts/contracts/WETH.sol/WETHToken.json';
import SoulBondSArtifact from './contracts/contracts/SoulBondS.sol/SoulBondS.json';
import { BigNumber } from 'ethers';




import { useState , useEffect} from 'react';
import { GlobalStyle } from './styles/global';

Modal.setAppElement('#root');

declare global {
  interface Window {
    ethereum: any;
  }
}




function App() {

  const [isDepositModal, setIsDepositModal] = useState(false);
  const [isBorrowModal, setIsBorrowModal] = useState(false);
  const [signer,setSigner] = useState<any>('');
  const [isConnected,setIsConnected] = useState(false);
  const [provider,setProvider] = useState<any>();
  const [contract,setContract] = useState("contract");
  //contracts states;
  const [WETHContract, setWETHContract] = useState<any>();
  const [DaiContract, setDaiContract] = useState<any>();
  const [SBLContract, setSBLContract] = useState<any>();
  const [SbLendingContract, setSbLendingContract] = useState<any>();

  //Balances States;
  const [WETHData, setWETHData] = useState<any>({
    name: 'WETH',
    price: 0 ,
    depositBalance: 0,
    borrowBalance: 0,
  });
  const [DaiData, setDaiData] = useState<any>({
      name: 'Dai',
      price: 0 ,
      depositBalance: 0,
      borrowBalance: 0
  });
  const [SBLData, setSBLData] = useState<any>({
      name: 'SBL',
      price: 0 ,
      depositBalance: 0,
      borrowBalance: 0,
  });  

  const [totalDepositBalance,setTotalDepositBalance]=useState<any>(0);
  const [totalBorrowBalance,setTotalBorrowBalance]=useState<any>(0);
  const [currentHealthFactor,setCurrentHealthFactor] = useState<any>(0);
  const [maxCollateralFactor,setMaxCollateralFactor] = useState<any>(70);

  //Lending Pool and ERC20 Tokens Contracts
  const SbLendingAddress='0xAF451392f7524CF76240FD886C924A5041b8fb6d';
  const WETHAddress='0x7B99CBF7300B1208B64Fa648435d26b2116991e8';
  const DAIAddress='0x8a8c52A98a67f8e762482B6B17B9a17fcEe46352';
  const SBLAddress='0xc2C2A117B4f9fd7d73FB7695E075216dC0348FBC';


  //SoulBond Tokens Address
  const soulBondSAddress='0x7228f2c0f1E7948024056e1bc1CC310850f46432';
  const soulBondAAddress='0xa37F2fBdd86B5A686E5733C8B838E3beC9b5d174';
  const soulBondBAddress='0xE3F6cbFad9DB22acFD4251dd87B162AffCD2ae69';
  const soulBondCAddress='0x46F411c24ffF4338Fb1f09a026Da1a3F3b764Ec5';
  const soulBondDAddress='0x43b2EeD08547671220749bFE390fF45516c49134';

  const ERC20Abi = WETHArtifact.abi;
  const sbLendingAbi = sbLendingArtifact.abi;


 async function connectWallet(){
    const {ethereum} = window;
    if(ethereum && !isConnected){
        const provider = new ethers.providers.Web3Provider(ethereum);
        await ethereum.request({ method: 'eth_requestAccounts' });
        const signer = provider.getSigner();
        setSigner(signer);
        setProvider(provider);
        setIsConnected(true);
        getPoolsData();
    } else {
    }
  }

  async function getPoolsData(){
        
    if(signer){
        const sbLending = new ethers.Contract(SbLendingAddress,sbLendingArtifact.abi,signer);
        const userAddress = await signer.getAddress();

        const WETHPrice =(await sbLending.getLatestPrice(WETHAddress)).toString();
        const DaiPrice = (await sbLending.getLatestPrice(DAIAddress)).toString();
        const SblPrice = (await sbLending.getLatestPrice(SBLAddress)).toString();

        const WETHDepositBalance =(await sbLending.ERC20DepositList(WETHAddress,userAddress)).toString();
        const DaiDepositBalance = (await sbLending.ERC20DepositList(DAIAddress,userAddress)).toString();
        const SblDepositBalance = (await sbLending.ERC20DepositList(SBLAddress,userAddress)).toString();

        const WETHBorrowBalance = (await sbLending.ERC20BorrowList(WETHAddress,userAddress)).toString();
        const DaiBorrowBalance = (await sbLending.ERC20BorrowList(DAIAddress,userAddress)).toString();
        const SblBorrowBalance = (await sbLending.ERC20BorrowList(SBLAddress,userAddress)).toString();

        const totalDepositBalanceData = (await sbLending.calculateTotalDeposit(userAddress)).toString();
        const totalBorrowBalanceData = (await sbLending.calculateTotalBorrowed(userAddress)).toString();
        const maxCollateralPercentage = (await sbLending.calculateMaxBorrowPercentage(userAddress)).toString();

        // let currentHealthFactor =0;
        // if(totalDepositBalanceData != 0){
        //    currentHealthFactor = totalBorrowBalanceData/totalDepositBalanceData;
        // }


        setTotalDepositBalance(totalDepositBalanceData);
        setTotalBorrowBalance(totalBorrowBalanceData);
        setCurrentHealthFactor(currentHealthFactor);
        setMaxCollateralFactor(maxCollateralPercentage);


        console.log(`WETH Deposit Balance: ${WETHDepositBalance}`)
        console.log(`Dai Deposit Balance: ${DaiDepositBalance}`)
        console.log(`SBL Deposit Balance: ${SblDepositBalance}`)


        setWETHData({
            name:WETHData.name,
            depositBalance:WETHDepositBalance,
            price: WETHPrice,
            borrowBalance: WETHBorrowBalance
        })

        setDaiData({
            name:DaiData.name,
            depositBalance:DaiDepositBalance,
            price: DaiPrice,
            borrowBalance: DaiBorrowBalance
        })

        setSBLData({
            name:SBLData.name,
            depositBalance:SblDepositBalance,
            price: SblPrice,
            borrowBalance: SblBorrowBalance
        })


    }
   
}

 

  function handleOpenDepositModal(contract:any){
    setIsDepositModal(true);
    setContract(contract);
  }

  function handleCloseDepositModal(){
    setIsDepositModal(false);
  }

  function handleOpenBorrowModal(contract:any){
    setIsBorrowModal(true);
    setContract(contract);
  }

  function handleCloseBorrowModal(){
    setIsBorrowModal(false);
  }
  useEffect(()=>{
    getPoolsData();

  },);

  return (
    <>
      <Header 
        onConnectWallet={connectWallet}
        onIsConnected={isConnected}
      />
      
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
