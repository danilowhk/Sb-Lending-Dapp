import { Summary } from "../Summary"
import { Container } from "./styles"
import { TransactionsTable } from "../TransactionsTable";



export function Dashboard(){
 
    return(
        <Container>
            <Summary></Summary>
            <TransactionsTable></TransactionsTable>

        </Container>
    )
};