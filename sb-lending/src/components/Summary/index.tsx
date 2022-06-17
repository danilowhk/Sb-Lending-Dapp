import { Container } from "./styles";

export function Summary(){
    return(
        <Container>
            <div>
                <h2>Borrow</h2>
                <h2>$ 200</h2>
            </div>
            <div>
                <h2>Lend</h2>
                <h2>$ 100</h2>
            </div>
            <div>
                <h2>Balance</h2>
                <h2>$ 100</h2>
            </div>
        </Container>
    )
}