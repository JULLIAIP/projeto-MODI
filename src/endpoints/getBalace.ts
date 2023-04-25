import { Request, Response } from "express";
import { CRUD } from "../crud";

export const getBalance = (req: Request, res: Response) => {
    let status = 200;
    let message = 'Operação concluída com sucesso '
    try {
        const cpf = req.params.cpf
        if (!cpf) {
            throw new Error()
        }
        const result = CRUD.getBalance(cpf)

        if (!result) {
            throw new Error()
        }
        res.send(result).status(status).end()

    } catch (error) {
        
        res.send(message).status(status).end()
    }
}