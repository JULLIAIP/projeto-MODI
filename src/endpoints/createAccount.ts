import { Request, Response } from "express";
import { Account } from "../class/Account"
import fs from 'fs';

export const createAccount = (req: Request, res: Response) => {

    const accounts: Account[] = []
    try {
        const { name, cpf, birthDate } = req.body

        //verificando se ja existe conta com o cpf informado
        const duplicateAccount: Account | undefined = accounts.find(
            (account) => account.getCpf() === cpf
        )
        if (duplicateAccount) {
            throw new Error()
        }

        //verificando idade
        const age: number = Number(birthDate)
        if (age < 18) {
            throw new Error()
        }


        accounts.push(
            new Account(name, cpf, birthDate)
        )

        fs.writeFileSync('src/data.json', JSON.stringify(accounts, null, 2))
        res.send("Conta criada com sucesso!")
    } catch (error) {

        res.send("ocorreu algum erro").status(500).end()

    }



}