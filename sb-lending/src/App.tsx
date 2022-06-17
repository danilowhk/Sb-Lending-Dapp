import React from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import Modal from 'react-modal';
import { NewDepositModal } from './components/NewDepositModal';
import { NewBorrowModal } from './components/NewBorrowModal';


import { useState } from 'react';
import { GlobalStyle } from './styles/global';

Modal.setAppElement('#root');


function App() {

  const [isDepositModal, setIsDepositModal] = useState(false);
  const [isBorrowModal, setIsBorrowModal] = useState(false);

  const [contract,setContract] = useState("contract");

  function handleOpenDepositModal(){
    setIsDepositModal(true);
    setContract(contract);
  }

  function handleCloseDepositModal(){
    setIsDepositModal(false);
  }

  function handleOpenBorrowModal(){
    setIsBorrowModal(true);
    setContract(contract);
  }

  function handleCloseBorrowModal(){
    setIsBorrowModal(false);
  }
  return (
    <>
      <Header />
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
