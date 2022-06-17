import { Container } from "./styles";
import logoImg from "../../assets/logo.svg";


export function Header(){
    return(
        <Container>
            <img src={logoImg}></img>
            <button>Connect Wallet</button>
        </Container>
    )
}