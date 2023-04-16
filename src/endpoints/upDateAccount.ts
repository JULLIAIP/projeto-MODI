import { Request, Response } from "express";
import { crud } from "../crud";

export const upDateAccount = (req: Request, res: Response) => {
    
    let status = 200;
    let message = 'Transação concluída com sucesso'

    try {
        const { cpf, newName } = req.body
        if (!cpf || !newName) {
            status = 422;
            message = "Você precisa informar o cpf e o newName por body"
            throw new Error()
        }
        crud.upDateAccount(newName, cpf)

        res.send(message).status(status).end()

    } catch (error) {
        res.send(message).status(status).end()
    }




}