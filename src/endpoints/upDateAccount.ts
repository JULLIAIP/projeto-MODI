import { Request, Response } from "express";
import { CRUD } from "../crud";

export const updateAcount = (req: Request, res: Response) => {
    let status = 200;
    let message = 'Operação concluída com sucesso '
    try {
        const { cpf } = req.params
        const { newName } = req.body

        const result = CRUD.updateAcount(cpf, newName)

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