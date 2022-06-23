import Modal from 'react-modal';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from 'react';
import { ethers } from 'ethers';


interface NewBorrowModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    contract: string;
    provider: any;
    signer: any;
    ERC20Abi: any;
    sbLendingAbi: any;
}

export function NewBorrowModal({ isOpen, onRequestClose,contract , provider, signer,ERC20Abi,sbLendingAbi} : NewBorrowModalProps) {

    const [type, setType] = useState('borrow');
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

        const userAddress = await signer.getAddress();

        if(contract === "WETH"){
            if(type=='borrow'){
                const WETHBorrowTx = await sbLendingContract.borrowERC20(WETHAddress,amount);
                await WETHBorrowTx.wait();
            } else{
                const WETHPayBackTx = await sbLendingContract.payBackERC20(WETHAddress,amount);
                await WETHPayBackTx.wait();
            }

        }
        if(contract === "DAI"){
            if(type=='borrow'){
                const DaiBorrowTx = await sbLendingContract.borrowERC20(DAIAddress,amount);
                await DaiBorrowTx.wait();
            } else{
                const DaiPayBackTx = await sbLendingContract.payBackERC20(DAIAddress,amount);
                await DaiPayBackTx.wait();
            }
        }
        if(contract === "SBL"){
            if(type=='borrow'){
                const SBLBorrowTx = await sbLendingContract.borrowERC20(SBLAddress,amount);
                await SBLBorrowTx.wait();
            } else{
                const SBLPayBackTx = await sbLendingContract.payBackERC20(SBLAddress,amount);
                await SBLPayBackTx.wait();
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

