import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from 'react';
import {ethers} from 'ethers';


interface NewDepositModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    contract: string;
    provider: any;
    signer: any;
    ERC20Abi: any;
    sbLendingAbi: any;
}

export function NewDepositModal({ isOpen, onRequestClose,contract, provider, signer,ERC20Abi,sbLendingAbi} : NewDepositModalProps) {
    // const {createTransaction} = useTransactions();

    const [type, setType] = useState('deposit');
    const [amount,setAmount] = useState(0);

    const SbLendingAddress='0xAF451392f7524CF76240FD886C924A5041b8fb6d';
    const WETHAddress='0x7B99CBF7300B1208B64Fa648435d26b2116991e8';
    const DAIAddress='0x8a8c52A98a67f8e762482B6B17B9a17fcEe46352';
    const SBLAddress='0xc2C2A117B4f9fd7d73FB7695E075216dC0348FBC';
    let sbLendingContract:any;


    if(signer){
        sbLendingContract = new ethers.Contract(SbLendingAddress,sbLendingAbi,signer);
    }



    async function handleSubmit(event: FormEvent){
        event.preventDefault();

        // const userAddress = await signer.getAddress();

        if(contract === "WETH"){
            if(type=='deposit'){
        
                const WETHDepositTx = await sbLendingContract.depositERC20(WETHAddress,amount);
                await WETHDepositTx.wait();


            } else{
                const WETHWithdrawTx = await sbLendingContract.withdrawERC20(WETHAddress,amount);
                await WETHWithdrawTx.wait();
            }
        }
        if(contract === "DAI"){
            if(type=='deposit'){
                const DaiDepositTx = await sbLendingContract.depositERC20(DAIAddress,amount);
                await DaiDepositTx.wait();
            } else{
                const DaiWithdrawTx = await sbLendingContract.withdrawERC20(DAIAddress,amount);
                await DaiWithdrawTx.wait();
            }
        }
        if(contract === "SBL"){
            if(type=='deposit'){
                const SBLDepositTx = await sbLendingContract.depositERC20(SBLAddress,amount);
                await SBLDepositTx.wait();
            } else{
                const SBLWithdrawTx = await sbLendingContract.withdrawERC20(SBLAddress,amount);
                await SBLWithdrawTx.wait();
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
