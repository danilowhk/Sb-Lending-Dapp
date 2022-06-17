import { Container } from "./styles";

interface HealhFactorProps{
    onMaxCollateralizationFactor:any,
    oncurrentHealthFactor:any
}


export function HealthFactor({oncurrentHealthFactor,onMaxCollateralizationFactor} :HealhFactorProps ){
    return(
        <Container>
            <div>
                <h3>Current Health Factor</h3>
                <h3>{oncurrentHealthFactor}%</h3>
            </div>
            <div>
                <h3>Max Colleteralization Factor</h3>
                <h3>{onMaxCollateralizationFactor}%</h3>
            </div>


        </Container>
    )
}