import { Transaction } from "./Transaction";

export class Account {
    constructor(
        private name: string,
        private cpf: string,
        private birthDate: string,
        private balance: number = 0,
        private transactions: Transaction[] = []
    ) {

    }
    //controlando acesso
    getName = () => this.name
    getCpf = () => this.cpf
    getBirthDate = () => this.birthDate
    getBalance = () => this.balance
    getTransactions = () => this.transactions
    addTransaction = (transaction: Transaction): void => {
        this.transactions.push(transaction)
    }
    upDateBlance = (value: number): void => {
        this.balance += value
    }


}