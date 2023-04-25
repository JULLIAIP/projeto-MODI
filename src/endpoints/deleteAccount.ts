import { Request, Response } from "express";
import { CRUD } from "../crud";

export const deleteAccount = (req: Request, res: Response) => {

    let status = 200;
    let message = "Conta apaga com sucesso!"

    try {

        const cpf = req.params.cpf
        console.log(cpf)

        const result: any = CRUD.deleteAccount(cpf)


        if (!result) {
            status = 404;
            message = "Não existe uma conta com esse cpf"
            throw new Error()
        }

        //desafio
        if (result[0]) {
            status = result[1]
            message = result[0]
            throw new Error()
        }
        //

        res.send(message).status(status).end()

    } catch (error) {

        res.send(message).status(status).end()

    }
}