import { Container } from "./styles";
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { TransactionsContext, useTransactions } from "../../hooks/useTransactions";
import { useContext } from 'react';


export function Summary() {


    const {transactions} = useTransactions();

    const totalDeposit = transactions.reduce((acc, transaction) => {
        if(transaction.type === 'deposit'){
            return acc+transaction.amount;
        }

        return acc;
    },0);

    let totalWithdraw =0;

    for(let i = 0; i < transactions.length; i++){
        if(transactions[i].type === 'withdraw'){
            totalWithdraw += transactions[i].amount;
        }
    }

    let totalDifference = totalDeposit-totalWithdraw;

    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>${totalDeposit}</strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saidas" />
                </header>
                <strong>-${totalWithdraw}</strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>${totalDifference}</strong>
            </div>

        </Container>
    )
}