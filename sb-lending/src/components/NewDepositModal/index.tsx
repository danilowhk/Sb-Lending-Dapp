import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from 'react';


interface NewDepositModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    contract: string;
}

export function NewDepositModal({ isOpen, onRequestClose,contract} : NewDepositModalProps) {
    // const {createTransaction} = useTransactions();

    const [type, setType] = useState('deposit');
    const [amount,setAmount] = useState(0);



    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        if(contract === "WETH"){
            if(type=='deposit'){
                console.log("Deposit WETH")
                console.log(amount)
            } else{
                console.log("Withdraw WETH")
                console.log(amount)
            }
        }
        if(contract === "DAI"){
            if(type=='deposit'){
                console.log("Deposit WETH")
                console.log(amount)
            } else{
                console.log("Withdraw WETH")
                console.log(amount)
            }
        }
        if(contract === "SBL"){
            if(type=='deposit'){
                console.log("Deposit WETH")
                console.log(amount)
            } else{
                console.log("Withdraw WETH")
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

            <h2>Deposit/Withdraw</h2>
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
                        onClick={() => { setType('deposit');}}
                        isActive ={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg}></img>  
                        <span>Deposit</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        className=""
                        onClick={() => { setType('withdraw');}}
                        isActive ={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg}></img> 
                        <span>Withdraw</span> 
                    </RadioBox>
            </TransactionTypeContainer>
        
            
            <button type='submit'>Send Transaction</button>
            
          </Container>
          
      </Modal>
    )
}
