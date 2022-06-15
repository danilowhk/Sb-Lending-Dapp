import { useEffect, useState, useContext } from "react";
import { api } from "../../services/api";
import { TransactionsContext, useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function TransactionsTable(){


    const {transactions} = useTransactions();


    return(
        <Container>
                <table>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Valor</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map(transaction=> (
                            <tr key={transaction.id}>
                                <td>{transaction.title}</td>
                                <td  className={transaction.type} >{transaction.amount}</td>
                                <td>{transaction.category}</td>
                            </tr>
                        ))}
                       
                    </tbody>

              
                </table>
                <table>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Valor</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map(transaction=> (
                            <tr key={transaction.id}>
                                <td>{transaction.title}</td>
                                <td  className={transaction.type}>{transaction.amount}</td>
                                <td>{transaction.category}</td>
                            </tr>
                        ))}
                       
                    </tbody>

              
                </table>

        </Container>
    )
}