import { app } from "./app";
import { createAccount } from "./endpoints/createAccount";

app.post("/account", createAccount)