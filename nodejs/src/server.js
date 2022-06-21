import express from "express";
import cors from 'cors'
import initWebRoutes from "./routes/webroutes";
import isConnectedDatabase from "./config/connectDatabase";
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors({ origin: process.env.URL_REACT_APP }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initWebRoutes(app)
isConnectedDatabase()


// server run on the port
let port = process.env.PORT || 5555
app.listen(port, () => console.log(`Server is running on ${port}`))

