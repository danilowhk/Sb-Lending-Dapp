import { Container } from "./styles";
interface BorrowListProps{
    onOpenBorrowModal:(contract:any) => void;
}



export function BorrowList({onOpenBorrowModal} : BorrowListProps ){
    return(
        <Container>
            <h1>Borrow Tokens List</h1>
            <div>
                <p>WETH</p>
                <p>$1100</p>
                <p>100</p>
                <button onClick={()=>onOpenBorrowModal('WETH')}>Borrow / PayBack</button>
            </div>
            <div>
                <p>DAI</p>
                <p>$1</p>
                <p>20</p>
                <button onClick={()=>onOpenBorrowModal('DAI')}>Borrow / PayBack</button>
            </div>
            <div>
                <p>SBL</p>
                <p>$17</p>
                <p>0</p>
                <button onClick={()=>onOpenBorrowModal('SBL')}>Borrow / PayBack</button>
            </div>
        </Container>
    )
}