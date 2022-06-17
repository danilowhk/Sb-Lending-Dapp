import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from 'react';


interface NewBorrowModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    contract: string;
}

export function NewBorrowModal({ isOpen, onRequestClose,contract} : NewBorrowModalProps) {
    // const {createTransaction} = useTransactions();

    const [type, setType] = useState('borrow');
    const [amount,setAmount] = useState(0);



    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        if(contract === "WETH"){
            if(type=='borrow'){
                console.log("Borrow WETH")
                console.log(amount)
            } else{
                console.log("PayBack WETH")
                console.log(amount)
            }

        }
        if(contract === "DAI"){
            if(type=='borrow'){
                console.log("Borrow DAI")
                console.log(amount)
            } else{
                console.log("PayBack DAI")
                console.log(amount)
            }
        }
        if(contract === "SBL"){
            if(type=='borrow'){
                console.log("Borrow SBL")
                console.log(amount)
            } else{
                console.log("PayBack SBL")
                console.log(amount)
            }
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
            <h2>{contract}</h2>


            <input type="number" 
            placeholder="Valor"
                value={amount}
                onChange={event => setAmount(Number(event.target.value))}
            ></input>

            <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        className={type === 'deposit' ? 'active' : ''}
                        onClick={() => { setType('borrow');}}
                        isActive ={type === 'borrow'}
                        activeColor="green"
                    >
                        <img src={incomeImg}></img>  
                        <span>Borrow</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        className=""
                        onClick={() => { setType('payBack');}}
                        isActive ={type === 'payBack'}
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

