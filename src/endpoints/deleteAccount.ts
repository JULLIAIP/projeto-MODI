import { Request, Response } from "express";
import { crud } from "../crud";

export const deleteAccount = (req: Request, res: Response) => {

    let status = 200;
    let message = 'Transação concluída com sucesso'

    try {
        const cpf = req.params.cpf
        if (!cpf) {
            status = 422;
            message = 'Você precisa informar o cpf pelo path'
            throw new Error()
        }

        const result = crud.deleteAccount(cpf)

        if (!result) {
            status = 404;
            message = 'cpf não entrado'
            throw new Error()
        }


        res.send(message).status(status).end()
    } catch (error) {
        res.send(message).status(status).end()
    }

}