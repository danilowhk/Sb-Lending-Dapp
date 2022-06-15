import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
    );


interface Transaction{
    id:number,
    amount:number,
    title:string,
    type:string,
    category:string
}

interface TransactionsProviderProps
{
    children: ReactNode;
}

// interface TransactionInput{
//     id:number,
//     amount:number,
//     title:string,
//     type:string,
//     category:string
// }

type TransactionInput = Omit<Transaction, 'id'>;

// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction:(transaction: TransactionInput) => Promise<void>;
}

export function TransactionsProvider(props: TransactionsProviderProps){
    // In this function, we calculate every State we would like to use in the Context an use .Provider
    //This code would have to be in the App page so we create this function to create the State, calculate everything we need and send everything from here and make the App component Cleaner.
    //By using useContext, we are acessing Context.Consumer, which is a way to access the "values" from Context.Provider.
    const [transactions, setTransactions] = useState<Transaction[]>([]);


    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: TransactionInput){
   
        const response = await api.post('/transactions', transactionInput);
        const { transaction } = response.data;
        setTransactions([
            ...transactions,
            transaction
        ])
    }


    return(
        <TransactionsContext.Provider value={{ transactions, createTransaction}}>
            {props.children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    //here we are creating a function to swap alot of code that repeats itself in many components.
    const context = useContext(TransactionsContext);

    return context;
}





