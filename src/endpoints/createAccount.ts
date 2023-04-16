import { Request, Response } from "express";
import { Account } from "../types/typesBank";
import { crud } from "../crud";

export const createAccount = (req: Request, res: Response) => {

    let status = 0;
    let messagem = "";

    try {
        const { name, cpf, birthDate } = req.body

        const accounts: Account[] = crud.accounts;

        const today = new Date().toString()

        //verificando se ja existe conta com o cpf informado
        const duplicateAccount: Account | undefined = accounts.find(
            (account) => account.cpf === cpf
        )
        
        if (duplicateAccount) {
            status = 422
            messagem = "Esse cpf já existe"
            throw new Error()
        }

        //verificando idade
        const age: number = Number(birthDate)
        if (age < 18) {
            status = 422
            messagem = "você precisar ter mais de 18 anos"
            throw new Error()
        }

        const newAccount: Account = {
            name,
            cpf,
            birthDate,
            balance: 0,
            transactions: []
        }

        crud.createAccount(newAccount)

        res.send("Conta criada com sucesso!")

    } catch (error) {

        res.send(messagem).status(status).end()

    }



}