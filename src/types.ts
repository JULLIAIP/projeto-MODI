
export type Transaction = {
    type: "entrada" | "saida",
    value: number,
    desc: string,
    date: string
}

export type Account = {
    name: string,
    cpf: string,
    birthDate: string,
    balance: number
    transactions: Transaction[]
}
