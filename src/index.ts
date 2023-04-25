import { app } from "./app"
import { RemoveBalance } from "./endpoints/RemoveBalance"
import { addNewTransaction } from "./endpoints/addNewTransaction"
import { createAccount } from "./endpoints/createAccount"
import { deleteAccount } from "./endpoints/deleteAccount"
import { getAccount } from "./endpoints/getAccount"
import { getBalance } from "./endpoints/getBalace"
import { updateAcount } from "./endpoints/upDateAccount"


app.get("/account", getAccount)
app.post("/account", createAccount)
app.put("/account/:cpf", updateAcount)
app.delete("/account/:cpf", deleteAccount)

app.get("/account/:cpf/balance", getBalance)
app.put("/account/:cpf/transaction", addNewTransaction)
app.put("/account/:cpf/saque", RemoveBalance)

