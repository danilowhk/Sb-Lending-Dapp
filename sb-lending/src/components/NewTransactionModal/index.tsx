import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState, useContext } from 'react';
import { api } from '../../services/api';
import { TransactionsContext, useTransactions } from '../../hooks/useTransactions';


interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose} : NewTransactionModalProps) {
    const {createTransaction} = useTransactions();

    const [type, setType] = useState('deposit');
    const [amount,setAmount] = useState(0);
    const [category,setCategory] =useState('');
    const [title,setTitle] =useState('');

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        await createTransaction({
            amount,
            title,
            type,
            category
        })
        setTitle('deposit');
        setAmount(0);
        setCategory('');
        setTitle('');
        onRequestClose();
    };

    return(
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
          <Container onSubmit={handleCreateNewTransaction}>

            <button type="button" onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar modal" />
            </button>  

            <h2>Cadastrar transacao</h2>

            <input placeholder="Título" 
                value={title} 
                onChange={event => setTitle(event.target.value)}
            />


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
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        className=""
                        onClick={() => { setType('withdraw');}}
                        isActive ={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg}></img> 
                        <span>Saida</span> 
                    </RadioBox>
            </TransactionTypeContainer>
            
            <input placeholder='Categoria'
                value={category}
                onChange={event => setCategory(event.target.value)}
            />
            
            <button type='submit'>Cadastrar</button>
            
          </Container>
          
      </Modal>
    )
}