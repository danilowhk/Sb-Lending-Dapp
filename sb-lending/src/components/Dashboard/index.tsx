import { BorrowList } from "../BorrowList";
import { HealthFactor } from "../HealthFactor";
import { List } from "../Lists";
import { Summary } from "../Summary";
import { Container } from "./styles";
import {useEffect, useState} from 'react';

interface DashboardProps{
    onOpenDepositModal: (contract:any) => void;
    onOpenBorrowModal: (contract:any) => void;
    provider: any;
    signer: any;
}

export function Dashboard({onOpenDepositModal,onOpenBorrowModal, provider, signer}:DashboardProps ){
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
    const [totalDepositBalance,setTotalDepositBalance]=useState<any>(0)
    const [totalBorrowBalance,setTotalBorrowBalance]=useState<any>(0)
    const [currentHealthFactor,setCurrentHealthFactor] = useState<any>(0)
    const [maxCollateralizationFactor,setMaxCollateralizationFactor] = useState<any>(70)


    function getERC20TokensData(){
        console.log(provider);
    }

    async function getPoolsData(){
        if(signer){
            const wallet = await signer.getAddress();
            console.log(wallet);
        }
       
    }

    useEffect(()=>{
        // console.log("Hello Use Effect from Dashboard Component")
        getPoolsData();
        getERC20TokensData();
    },[provider]);

    return(
        <Container>
            <Summary 
                onTotalDepositBalance={totalDepositBalance}
                onTotalBorrowBalance={totalBorrowBalance}
            />
            <HealthFactor 
                onMaxCollateralizationFactor={maxCollateralizationFactor}
                oncurrentHealthFactor={currentHealthFactor}
                />
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