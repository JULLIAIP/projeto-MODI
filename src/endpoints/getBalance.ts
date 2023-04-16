import { Request, Response } from "express"
import { crud } from "../crud";

export const getBalance = (req: Request, res: Response) => {

    try {
        const { cpf } = req.query;

        const extrato = crud.getBalance(cpf as string)
        if (!extrato) {

            throw new Error()
        }

        res.send(extrato)

    } catch (error) {
        res.send("usuário nao encontrado")
    }



}