
import { Request, Response } from "express";
import { Account } from "../types";
import { CRUD } from "../crud";

export const createAccount = (req: Request, res: Response) => {

    let status = 200;
    let message = 'Transação concluída com sucesso'

    try {

        const { name, cpf, birthDate } = req.body
        const convertDate = new Date(birthDate)
        const today = new Date()

        //confere dados da requisição 

        if (!name || !cpf || !birthDate) {
            status = 422;
            message = "Você precisa informar no body : name, cpf e birthDate"
            throw new Error()
        }

        //confere idade
        let year = today.getFullYear() - convertDate.getFullYear()
        const month = today.getMonth() - convertDate.getMonth()
        const day = today.getDate() - convertDate.getDate()

        if (month < 0 || month === 0 && day < 0) {
            year--
        }

        if (year < 18) {
            status = 400;
            message = "Você precisa ter mais de 18 anos para abrir uma conta"
            throw new Error()
        }


        const newAccount: Account = {
            name,
            cpf,
            birthDate: convertDate.toString(),
            balance: 0,
            transactions: []
        }
        const result = CRUD.createAccount(newAccount)
        if (!result) {
            status = 400;
            message = "Já existe uma conta com esse cpf"
            throw new Error()
        }

        res.send(message).status(status).end()

    } catch (error) {

        res.send(message).status(status).end()

    }
}