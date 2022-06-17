import { Container } from "./styles";
import {useState} from 'react';

interface DepositListProps{
    onOpenDepositModal: (contract:any) => void;
    onWETHData: any;
    onDaiData: any;
    onSBLData: any;
}

export function DepositList({onOpenDepositModal, onWETHData,onDaiData,onSBLData }:DepositListProps){



    return(
        <Container>
            <h1>Deposit Token List</h1>
            <span className="Title">
                <p>Name</p>
                <p>Price</p>
                <p>Balance</p>
                <p>   </p>
            </span>

            <div>
                <p>{onWETHData.name}</p>
                <p>${onWETHData.price}</p>
                <p>{onWETHData.depositBalance}</p>
                <button onClick={()=>onOpenDepositModal('WETH')}>Deposit / Withdraw</button>
            </div>
            <div>
                <p>{onDaiData.name} </p>
                <p>${onDaiData.price}</p>
                <p>  {onDaiData.depositBalance}</p>
                <button onClick={()=>onOpenDepositModal('DAI')}>Deposit / Withdraw</button>
            </div>
            <div>
                <p>{onSBLData.name} </p>
                <p>${onSBLData.price}</p>
                <p>{onSBLData.depositBalance}</p>
                <button onClick={()=>onOpenDepositModal('SBL')}>Deposit / Withdraw</button>
            </div>
            
        </Container>
    )
}