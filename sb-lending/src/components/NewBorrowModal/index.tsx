import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from 'react';
// import {  useTransactions } from '../../hooks/useTransactions';


interface NewBorrowModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    contract: string;
}

export function NewBorrowModal({ isOpen, onRequestClose,contract} : NewBorrowModalProps) {
    // const {createTransaction} = useTransactions();

    const [type, setType] = useState('deposit');
    const [amount,setAmount] = useState(0);



    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        if(contract == "contract"){
            console.log("Contract1")
        }


    }
    return(
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
          <Container onSubmit={handleSubmit}>

            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar modal" />
            </button>  

            <h2>Borrow/PayBack</h2>


            <input type="number" 
            placeholder="Valor"
                value={amount}
                onChange={event => setAmount(Number(event.target.value))}
            ></input>

            <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        className={type === 'deposit' ? 'active' : ''}
                        onClick={() => { setType('deposit');}}
                        isActive ={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg}></img>  
                        <span>Borrow</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        className=""
                        onClick={() => { setType('withdraw');}}
                        isActive ={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg}></img> 
                        <span>PayBack</span> 
                    </RadioBox>
            </TransactionTypeContainer>
        
            
            <button type='submit'>Send Transaction</button>
            
          </Container>
          
      </Modal>
    )
}

