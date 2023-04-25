import { Request, Response } from "express";
import { CRUD } from "../crud";


export const RemoveBalance = (req: Request, res: Response) => {
    let status = 200;
    let message = 'Operação concluída com sucesso '
    try {
        const cpf = req.params.cpf

        const result = CRUD.upDateRemoveBalance(cpf)

        if (!result) {
            status = 404;
            message = "Não existe uma conta com esse cpf ou a conta está zerada"
            throw new Error()
        }
        res.send(`Valor sacado: ${result}`).status(status).end()
    } catch (error) {
        res.send(message).status(status).end()
    }
}