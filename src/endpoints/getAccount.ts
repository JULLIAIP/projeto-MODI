import { Request, Response } from "express"
import { crud } from "../crud";

export const getAccount = (req: Request, res: Response) => {

    try {
        const { name, cpf } = req.query;

        const account = crud.getAccount(name as string, cpf as string)
''
        if (!account) {
 
            throw new Error()
        }

        res.send(account)

    } catch (error) {
        res.send("usuário nao encontrado")
    }



}