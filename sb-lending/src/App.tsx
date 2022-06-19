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


  //lending Pool Address
  const SbLendingAddress='0xd53890360fFB710c3565c37CEE129Eb0Da8C1e96';
  //ERC20 Tokens Address
  const WETHAddress='0x8662e360188d612685362A35770f4A0657089ce0';
  const daiAddress='0xC38b6D54635327516B9aEa23664afca2a86c464a';
  const SBLAddress='0x5dd36E5c3d054C0c8D7a126bF67B7868f8537F1B';
  //SoulBond Tokens Address
  const soulBondSAddress='0x7228f2c0f1E7948024056e1bc1CC310850f46432';
  const soulBondAAddress='0xa37F2fBdd86B5A686E5733C8B838E3beC9b5d174';
  const soulBondBAddress='0xE3F6cbFad9DB22acFD4251dd87B162AffCD2ae69';
  const soulBondCAddress='0x46F411c24ffF4338Fb1f09a026Da1a3F3b764Ec5';
  const soulBondDAddress='0x43b2EeD08547671220749bFE390fF45516c49134';







 async function connectWallet(){
    const {ethereum} = window;
    if(ethereum && !isConnected){
        const provider = new ethers.providers.Web3Provider(ethereum);
        await ethereum.request({ method: 'eth_requestAccounts' });
        const signer = provider.getSigner();
        setSigner(signer);
        setProvider(provider);
        setIsConnected(true);
    } else {
    }
  }

  async function depositERC20(){
    const contract = new ethers.Contract(SbLendingAddress,sbLendingArtifact.abi,signer);

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
        signer={signer}
      />
      <NewDepositModal
        isOpen={isDepositModal}
        onRequestClose={handleCloseDepositModal}
        contract={contract}
        provider={provider}
        signer={signer}
      />
      <NewBorrowModal
        isOpen={isBorrowModal}
        onRequestClose={handleCloseBorrowModal}
        contract={contract}
        provider={provider}
        signer={signer}
      />
      <GlobalStyle />
    </>
    
  );
}

export default App;
