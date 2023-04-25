import { getBalance } from './getBalace';
import { Request, Response } from "express";
import { CRUD } from "../crud";
import { Transaction } from "../types";

export const addNewTransaction = (req: Request, res: Response) => {
    let status = 200;
    let message = 'Transação concluída com sucesso'
    try {
        const cpf = req.params.cpf
        const { value } = req.body
        const type = value > 0 ? "entrada" : "saida"
        const date = new Date().toString()

        //confere saldo 
        const saldoAtual = CRUD.getBalance(cpf).saldo

        if (type === 'saida' && saldoAtual + value < 0) {
            status = 404;
            message = "Saldo insuficiente"
            throw new Error()
        }

        const newTransaction: Transaction = {
            type,
            value,
            desc: "Nova Transação",
            date
        }

        const result = CRUD.addTransaction(cpf, newTransaction)


        if (!result) {
            status = 404;
            message = "Não existe uma conta com esse cpf"
            throw new Error()
        }

        res.send(message).status(status).end()
    } catch (error) {
        res.send(message).status(status).end()
    }
}