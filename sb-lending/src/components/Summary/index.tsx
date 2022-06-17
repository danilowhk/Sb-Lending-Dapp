import { Container } from "./styles";

export function Summary(){
     

    return(
        <Container>
            <div>
                <h2>Total Deposit</h2>
                <h2>$ 200</h2>
            </div>
            <div>
                <h2>Total Borrow</h2>
                <h2>$ 100</h2>
            </div>
            <div>
                <h2>Balance</h2>
                <h2>$ 100</h2>
            </div>
        </Container>
    )
}