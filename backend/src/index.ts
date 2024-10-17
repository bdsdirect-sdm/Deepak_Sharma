import express from "express"

import cors from "cors"
import { config } from "dotenv"
import path = require("path")
import routes from "./routes"

config();
const app = express()

app.use(cors({
    origin:"*"
}))
app.use(express.json());
app.use('/upload', express.static(path.join(__dirname,'../upload')));
app.use("/api/v1",routes);

export default app;