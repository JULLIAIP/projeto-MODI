import { addTransaction } from './endpoints/addTransaction';
import { app } from "./app";
import { createAccount } from "./endpoints/createAccount";
import { getAccount } from "./endpoints/getAccount";
import { getBalance } from "./endpoints/getBalance";
import { upDateAccount } from './endpoints/upDateAccount';
import { deleteAccount } from './endpoints/deleteAccount';

app.get("/account", getAccount)
app.post("/account", createAccount)
app.put("/account", upDateAccount) // so é permitido alterar o nome
app.delete("/account/:cpf", deleteAccount)// apaga a partir do cpf


app.get("/account/balance", getBalance)
app.post("/:cpf/transaction", addTransaction)