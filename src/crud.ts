import fs from "fs"
import { Account, Transaction } from "./types/typesBank"

const file = () => {
    const data = fs.readFileSync('src/data.json', 'utf-8')
    return JSON.parse(data)
}

export const crud = {

    accounts: file(),

    getAccount(name: string, cpf: string) {

        const userAccount: Account | undefined = this.accounts.find(
            (acount: Account) => acount.cpf === cpf && acount.name === name)

        return userAccount
    },
    getBalance( cpf: string) {

        const extrato = {
            saldo: 0,
            entradas: 0,
            saidas: 0
        }

        const userAccount: Account | undefined = this.accounts.find(
            (acount: Account) => acount.cpf === cpf)

        extrato.saldo = Number(userAccount?.balance)

        userAccount?.transactions.forEach((transaction) => {

            if (transaction.type === 'entrada') {
                extrato.entradas = extrato.entradas + transaction.value

            } else if (transaction.type === 'saida') {
                extrato.saidas = extrato.saidas + transaction.value
            }
        })

        return (extrato)
    },
    createAccount(newAccount: Account) {

        this.accounts.push(newAccount)

        fs.writeFileSync('src/data.json', JSON.stringify(this.accounts, null, 2))

    },
    upDateAccount(newName: string, cpf: string) {

        this.accounts.forEach((account: Account) => {

            if (account.cpf === cpf) {
                account.name = newName
            }
        })

        fs.writeFileSync('src/data.json', JSON.stringify(this.accounts, null, 2))


    },
    addTransation(newTransaction: Transaction, cpf: string) {

        this.accounts.forEach((account: Account) => {
            if (account.cpf === cpf) {
                account.transactions.push(
                    newTransaction
                )
                //atualilzando o saldo
                account.balance = account.balance + newTransaction.value

            }
        })

        fs.writeFileSync('src/data.json', JSON.stringify(this.accounts, null, 2))

    },
    deleteAccount(cpf: string) {

        const itemRemove = this.accounts.findIndex((item: any) => item.cpf === cpf)

        if (itemRemove >= 0) {
            this.accounts.splice(itemRemove, 1)
            fs.writeFileSync('src/data.json', JSON.stringify(this.accounts, null, 2))
            return true
        } else {
            return false
        }
    }
}