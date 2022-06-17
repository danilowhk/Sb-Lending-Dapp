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

  const [contract,setContract] = useState("contract");

 function connectWallet(){
    const {ethereum} = window;
    if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        ethereum.request({ method: 'eth_requestAccounts' });
        const signer = provider.getSigner();
        setIsWallet(signer);
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
  return (
    <>
      <Header 
        onConnectWallet={connectWallet}
        wallet={isWallet}
      />
      
      <Dashboard
        onOpenDepositModal={handleOpenDepositModal}
        onOpenBorrowModal={handleOpenBorrowModal}
      />
      <NewDepositModal
        isOpen={isDepositModal}
        onRequestClose={handleCloseDepositModal}
        contract={contract}
      />
      <NewBorrowModal
        isOpen={isBorrowModal}
        onRequestClose={handleCloseBorrowModal}
        contract={contract}
      />
      <GlobalStyle />
    </>
    
  );
}

export default App;
