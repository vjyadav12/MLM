import express from "express";
import Db_connection from "./DB_Connection/db_connection.js";
import route from "./Router/router.js";
const app = express()
import cors from "cors";

Db_connection()
app.use(express.json());
app.use(express.urlencoded({extended:true})); //this is for reset token jo params me arha hai usko decode kar ke useful data nikal sake.
app.use(cors())

app.use("/", route)

export default app;