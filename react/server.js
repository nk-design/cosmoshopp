import express from "express";
import fs from "fs";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const morgan = require("morgan");

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

require("dotenv").config();


mongoose.connect(process.env.MONGO_URI, {})
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log("ERROR OCCURED", err))

fs.readdirSync("./server/routes").map(route => app.use("/api", require(`./server/routes/${route}`)));

const port = Number(process.env.NODEJSPORT) || 2023;

app.listen(port, console.log(`SERVER IS RUNNING ON PORT ${port}`))
