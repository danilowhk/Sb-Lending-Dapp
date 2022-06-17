import { Container } from "./styles";
interface BorrowListProps{
    onOpenBorrowModal:() => void;

}



export function BorrowList({onOpenBorrowModal} : BorrowListProps ){
    return(
        <Container>
            <h1>Borrow Tokens List</h1>
            <div>
                <p>Borrow Token 1</p>
                <p>$13</p>
                <p>100</p>
                <button onClick={onOpenBorrowModal}>Borrow Token 1</button>
            </div>
            <div>
                <p>Borrow Token 2</p>
                <p>$0.15</p>
                <p>20</p>
                <button onClick={onOpenBorrowModal}>Borrow Token 1</button>
            </div>
            <div>
                <p>Borrow Token 3</p>
                <p>$0.001</p>
                <p>0</p>
                <button onClick={onOpenBorrowModal}>Borrow Token 3</button>
            </div>
        </Container>
    )
}