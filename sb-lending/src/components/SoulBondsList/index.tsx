import { Container } from "./styles";

interface SoulBondProps {
  SoulBondData: any;
}



export function SoulBondsList({SoulBondData}: SoulBondProps) {
  return (
    <Container>
      <h1>SoulBond Tokens Count</h1>
      <div>
        <span>
          <p>S Class</p>
          <p>Amount: {(SoulBondData.sClass).toString()}</p>
        </span>
        <span>
          <p>A Class</p>
          <p>Amount: {(SoulBondData.aClass).toString()}</p>
        </span>
        <span>
          <p>B Class</p>
          <p>Amount: {(SoulBondData.bClass).toString()}</p>
        </span>
        <span>
          <p>C Class</p>
          <p>Amount: {(SoulBondData.cClass).toString()}</p>
        </span>
        <span>
          <p>D Class</p>
          <p>Amount: {(SoulBondData.dClass).toString()}</p>
        </span>
      </div>
    </Container>
  );
}
