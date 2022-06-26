import { Container } from "./styles";

interface ListProps {}

export function SoulBondsList({}: ListProps) {
  return (
    <Container>
      <h1>SoulBond Tokens Count</h1>
      <div>
        <span>
          <p>S Class</p>
          <p>Amount: 2</p>
        </span>
        <span>
          <p>A Class</p>
          <p>Amount: 2</p>
        </span>
        <span>
          <p>B Class</p>
          <p>Amount: 2</p>
        </span>
        <span>
          <p>C Class</p>
          <p>Amount: 2</p>
        </span>
        <span>
          <p>D Class</p>
          <p>Amount: 2</p>
        </span>
      </div>
    </Container>
  );
}
