import { Container } from "./styles";

interface HealhFactorProps{
    onMaxCollateralFactor:any,
    onCurrentHealthFactor:any
}


export function HealthFactor({onCurrentHealthFactor,onMaxCollateralFactor} :HealhFactorProps ){
    return(
        <Container>
            <div>
                <h3>Current Health Factor</h3>
                <h3>{onCurrentHealthFactor}%</h3>
            </div>
            <div>
                <h3>Max Colleteralization Factor</h3>
                <h3>{onMaxCollateralFactor}%</h3>
            </div>


        </Container>
    )
}