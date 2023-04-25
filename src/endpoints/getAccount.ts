import { Request, Response } from "express";
import { CRUD } from "../crud";
import { Account } from "../types";

export const getAccount = (req: Request, res: Response) => {

    let status = 200;
    let message = "Operação finalizada com sucesso"
    try {

        const cpf = req.query.cpf as string

        if (!cpf) {
            status = 404
            message ='você precisa informar o CPF'
            throw new Error()
        }

        const result: Account | undefined = CRUD.getAccountByCpf(cpf)

        if (!result) {
            status = 404
            message ='CPF NÃO ENCONTRADO [ ]'
            throw new Error()
        }

        res.send(result).status(200).end()

    } catch (error) {

        res.send(message).status(status).end()
    }
}