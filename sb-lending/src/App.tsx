// import React, { useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import Modal from 'react-modal';
import { NewDepositModal } from './components/NewDepositModal';
import { NewBorrowModal } from './components/NewBorrowModal';
import {ethers} from 'ethers';



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
  const [isWallet,setIsWallet] = useState<any>('');
  const [isConnected,setIsConnected] = useState(false);
  const [provider,setProvider] = useState<any>();
  const [contract,setContract] = useState("contract");
  //contracts states;
  const [WETHContract, setWETHContract] = useState<any>();
  const [DaiContract, setDaiContract] = useState<any>();
  const [SBLContract, setSBLContract] = useState<any>();
  const [SbLendingContract, setSbLendingContract] = useState<any>();


  //lending Pool Address
  const SbLendingAddress='';
  //ERC20 Tokens Address
  const WETHAddress='';
  const daiAddress='';
  const SBLAddress='';
  //SoulBond Tokens Address
  const soulBondSAddress='';
  const soulBondAAddress='';
  const soulBondBAddress='';
  const soulBondCAddress='';
  const soulBondDAddress='';







 async function connectWallet(){
    const {ethereum} = window;
    if(ethereum && !isConnected){
        const provider = new ethers.providers.Web3Provider(ethereum);
        await ethereum.request({ method: 'eth_requestAccounts' });
        const signer = provider.getSigner();
        setIsWallet(signer);
        setProvider(provider);
        setIsConnected(true);
    } else {
    }
  }

  function depositERC20(){

  }

  function withdrawERC20(){

  }

  function borrowERC20(){

  }

  function paybackERC20(){

  }
  

  function liquidateERC20(){

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
  },[]);

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
        signer={isWallet}
      />
      <NewDepositModal
        isOpen={isDepositModal}
        onRequestClose={handleCloseDepositModal}
        contract={contract}
        provider={provider}
        signer={isWallet}
      />
      <NewBorrowModal
        isOpen={isBorrowModal}
        onRequestClose={handleCloseBorrowModal}
        contract={contract}
        provider={provider}
        signer={isWallet}
      />
      <GlobalStyle />
    </>
    
  );
}

export default App;
