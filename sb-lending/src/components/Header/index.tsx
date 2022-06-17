import { Container } from "./styles";
import logoImg from "../../assets/logo.svg";

interface HeaderProps{
    onConnectWallet: () => void;
    wallet: any;
}

function checkButton(onConnectWallet:any,wallet:any){
     //how to make it change once its connected
    return( 
        <button onClick={onConnectWallet}>Connect Wallet</button>
    )
}


export function Header({onConnectWallet,wallet}: HeaderProps){
    return(
        <Container>
            <img src={logoImg}></img>
            {checkButton(onConnectWallet,wallet)}
        </Container>
    )
}