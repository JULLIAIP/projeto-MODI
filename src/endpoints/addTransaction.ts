import { crud } from '../crud';
import { Request, Response } from "express"
import { Transaction } from '../types/typesBank';

export const addTransaction = (req: Request, res: Response) => {

    let status = 200;
    let message = 'Transação concluída com sucesso'

    try {
        const { value } = req.body

        const cpf = req.params.cpf

        if (!cpf) {
            status = 422;
            message = "Você precisa informar o CPF por path"
            throw new Error()
        }

        const date = new Date().toString()
        const desc = "Valor em dinheiro"
        const type = value > 0 ? "entrada" : "saida"

        if (!value) {
            status = 422;
            message = 'Você precisa informar o valor'
            throw new Error()
        }

        const checaSaldo = crud.getBalance(cpf)

        if (checaSaldo.saldo + value < 0) {
            status = 400;
            message = 'Saldo insuficiente'
            throw new Error()
        }

        const newTransaction: Transaction = { type, value, desc, date }
        crud.addTransation(newTransaction, cpf)


        res.send(message).status(status).end()


    } catch (error) {

        res.send(message).status(status).end()

    }

}