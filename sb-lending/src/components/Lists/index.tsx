import { BorrowList } from "../BorrowList";
import { DepositList } from "../DepositList";
import { Container } from "./styles";

interface ListProps{
    onOpenDepositModal: (contract:any) => void;
    onOpenBorrowModal: (contract:any) => void;

}


export function List({onOpenDepositModal,onOpenBorrowModal} : ListProps){
    return(
        <Container>
            <DepositList
                onOpenDepositModal={onOpenDepositModal}
            />

            <BorrowList
                onOpenBorrowModal={onOpenBorrowModal}

            />

        </Container>
    )
}