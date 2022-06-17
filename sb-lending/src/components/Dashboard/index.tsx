import { BorrowList } from "../BorrowList";
import { HealthFactor } from "../HealthFactor";
import { List } from "../Lists";
import { Summary } from "../Summary";
import { Container } from "./styles";

interface DashboardProps{
    onOpenDepositModal: () => void;
    onOpenBorrowModal: () => void;
}

export function Dashboard({onOpenDepositModal,onOpenBorrowModal}:DashboardProps ){
    return(
        <Container>
            <Summary />
            <HealthFactor />
            <List 
                onOpenDepositModal={onOpenDepositModal}
                onOpenBorrowModal={onOpenBorrowModal}
            />
        
        </Container>
    )

};