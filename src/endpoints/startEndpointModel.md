import { Request, Response } from "express";

export const nomeDoEndpoint = (req: Request, res: Response) => {
    let status = 200;
    let message = 'Operação concluída com sucesso '
    try {
        const result = ''
        
        if(!result){
            throw new Error()
        }
        res.send(message).status(status).end()
    } catch (error) {
        res.send(message).status(status).end()
    }
}