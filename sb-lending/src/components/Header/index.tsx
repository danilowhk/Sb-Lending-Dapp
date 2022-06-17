import { Container } from "./styles";
import logoImg from "../../assets/logo.svg";
import { useEffect } from "react";

interface HeaderProps{
    onConnectWallet: () => void;
    onIsConnected: boolean;
}




export function Header({onConnectWallet,onIsConnected}: HeaderProps){
  function isConnectedButton(onIsConnected:boolean){
    if(!onIsConnected){
        return(
            <button onClick={onConnectWallet}>Connect Wallet</button>
        )
    } else{
        return(
            <button onClick={onConnectWallet}>Connected</button>
        )
    }
  } 
  useEffect(()=>{
    isConnectedButton(onIsConnected);
  },[onIsConnected])
    return(
        <Container>
            <img src={logoImg}></img>
            {isConnectedButton(onIsConnected)}
        </Container>
    )
}