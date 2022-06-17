import { BorrowList } from "../BorrowList";
import { DepositList } from "../DepositList";
import { Container } from "./styles";

interface ListProps{
    onOpenDepositModal: (contract:any) => void;
    onOpenBorrowModal: (contract:any) => void;
    onWETHData: any;
    onDaiData: any;
    onSBLData: any;
}


export function List({onOpenDepositModal,onOpenBorrowModal,onWETHData,onDaiData,onSBLData} : ListProps){
    return(
        <Container>
            <DepositList
                onOpenDepositModal={onOpenDepositModal}
                onWETHData={onWETHData}
                onDaiData={onDaiData}
                onSBLData={onSBLData}
            />

            <BorrowList
                onOpenBorrowModal={onOpenBorrowModal}
                onWETHData={onWETHData}
                onDaiData={onDaiData}
                onSBLData={onSBLData}

            />

        </Container>
    )
}