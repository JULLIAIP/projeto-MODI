import fs from "fs";
import { Account, Transaction } from "./types";
import { basename } from "path";

const writeInDB = (data: Account) => {
    fs.writeFileSync('src/account.json', JSON.stringify(data, null, 2))
}

export const CRUD = {

    account: JSON.parse(fs.readFileSync('src/account.json', 'utf-8')),

    getAccountByCpf(cpf: string): Account | undefined {
        return this.account.find((count: Account) => count.cpf === cpf)
    },
    createAccount(newAccount: Account) {
        //desafio
        const duplicateCpf = this.getAccountByCpf(newAccount.cpf)
        if (duplicateCpf) {
            return false
        }

        this.account.push(newAccount)
        fs.writeFileSync('src/account.json', JSON.stringify(this.account, null, 2))

        return true
    },
    updateAcount(cpf: string, newName: string) {

        const upDateItem = this.account.find((count: Account) => count.cpf === cpf)

        if (upDateItem) {
            upDateItem.name = newName
            fs.writeFileSync('src/account.json', JSON.stringify(this.account, null, 2))
            return true
        } else {
            return false
        }
    },    
    deleteAccount(cpf: string) {
        //desafio
        const checaSaldo = this.getAccountByCpf(cpf)

        if (checaSaldo != undefined && checaSaldo.balance > 0) {
            return [`Você precisa sacar ${checaSaldo.balance} a conta antes de apaga-la`, 400]
        }

        const removeItem = this.account.findIndex((count: Account) => count.cpf === cpf);

        if (removeItem < 0) {
            return false
        }

        this.account.splice(removeItem, 1)

        fs.writeFileSync('src/account.json', JSON.stringify(this.account, null, 2))

        return true
    },
    addTransaction(cpf: string, newTransaction: Transaction) {

        const addTransactionItem = this.getAccountByCpf(cpf)
        if (addTransactionItem) {

            addTransactionItem.transactions.push(newTransaction)

            //desafio 1 
            addTransactionItem.balance = addTransactionItem.balance + newTransaction.value
            //

            fs.writeFileSync('src/account.json', JSON.stringify(this.account, null, 2))

            return true
        } else {
            return false
        }


    },
    getBalance(cpf: string) {

        const extrato = {
            saldo: 0,
            entradas: 0,
            saidas: 0
        }

        const userAccount = this.getAccountByCpf(cpf)


        extrato.saldo = Number(userAccount?.balance)

        //Desafio - imprimir extrato detalhado
        userAccount?.transactions.forEach((transaction) => {

            if (transaction.type === 'entrada') {
                extrato.entradas = extrato.entradas + transaction.value

            } else if (transaction.type === 'saida') {
                extrato.saidas = extrato.saidas + transaction.value
            }
        })

        return (extrato)
    },
    upDateRemoveBalance(cpf: string) {

        const saque = Number(this.getAccountByCpf(cpf)?.balance)

        const newTransaction: Transaction = {
            date: new Date().toString(),
            desc: "Fechamento da conta",
            type: "saida",
            value: -saque
        }

        this.addTransaction(cpf, newTransaction)

        if (!saque || saque < 0) {
            return false
        }

        return saque

    }
}