import { Container } from "./styles";
interface SummaryProps {
  onTotalDepositBalance: any;
  onTotalBorrowBalance: any;
}

export function Summary({
  onTotalDepositBalance,
  onTotalBorrowBalance,
}: SummaryProps) {
  return (
    <Container>
      <div>
        <h2>Total Deposit</h2>
        <h2>$ {onTotalDepositBalance}</h2>
      </div>
      <div>
        <h2>Total Borrow</h2>
        <h2>$ {onTotalBorrowBalance}</h2>
      </div>
      <div>
        <h2>Balance</h2>
        <h2>$ {onTotalDepositBalance - onTotalBorrowBalance}</h2>
      </div>
    </Container>
  );
}
