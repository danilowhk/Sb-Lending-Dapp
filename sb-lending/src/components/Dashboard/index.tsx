import { BorrowList } from "../BorrowList";
import { HealthFactor } from "../HealthFactor";
import { List } from "../Lists";
import { Summary } from "../Summary";
import { Container } from "./styles";
import {useState} from 'react';

interface DashboardProps{
    onOpenDepositModal: (contract:any) => void;
    onOpenBorrowModal: (contract:any) => void;
}

export function Dashboard({onOpenDepositModal,onOpenBorrowModal}:DashboardProps ){
    const [WETHData, setWETHData] = useState<any>({
        name: 'WETH',
        price: 1080 ,
        depositBalance: 0,
        borrowBalance: 0,
    });
    const [DaiData, setDaiData] = useState<any>({
        name: 'Dai',
        price: 1 ,
        depositBalance: 0,
        borrowBalance: 0
    });
    const [SBLData, setSBLData] = useState<any>({
        name: 'SBL',
        price: 150 ,
        depositBalance: 0,
        borrowBalance: 0,
    });  

    return(
        <Container>
            <Summary />
            <HealthFactor />
            <List 
                onOpenDepositModal={onOpenDepositModal}
                onOpenBorrowModal={onOpenBorrowModal}
                onWETHData={WETHData}
                onDaiData={DaiData}
                onSBLData={SBLData}
            />
        
        </Container>
    )

};