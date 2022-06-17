import { Container } from "./styles";

interface DepositListProps{
    onOpenDepositModal: (contract:any) => void;
}

export function DepositList({onOpenDepositModal}:DepositListProps){

    return(
        <Container>
            <h1>Deposit Token List</h1>
            <div>
                <p>WETH</p>
                <p>$1100</p>
                <p>1000</p>
                <button onClick={()=>onOpenDepositModal('WETH')}>Deposit / Withdraw</button>
            </div>
            <div>
                <p>DAI</p>
                <p>$1</p>
                <p>2000</p>
                <button onClick={()=>onOpenDepositModal('DAI')}>Deposit / Withdraw</button>
            </div>
            <div>
                <p>SBL</p>
                <p>$17</p>
                <p>0</p>
                <button onClick={()=>onOpenDepositModal('SBL')}>Deposit / Withdraw</button>
            </div>
            
        </Container>
    )
}