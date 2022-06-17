import { Container } from "./styles";

interface DepositListProps{
    onOpenDepositModal: () => void;
}

export function DepositList({onOpenDepositModal}:DepositListProps){

    return(
        <Container>
            <h1>Deposit Token List</h1>
            <div>
                <p>Deposit Token 1</p>
                <p>$10</p>
                <p>1000</p>
                <button onClick={onOpenDepositModal}>Deposit Token1</button>
            </div>
            <div>
                <p>Deposit Token 2</p>
                <p>$5</p>
                <p>2000</p>
                <button onClick={onOpenDepositModal}>Deposit Token2</button>
            </div>
            <div>
                <p>Deposit Token 3</p>
                <p>$0.1</p>
                <p>0</p>
                <button onClick={onOpenDepositModal}>Deposit Token3</button>
            </div>
            
        </Container>
    )
}