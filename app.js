import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cartRouter from "./routes/cartRoutes";
import * as dotenv from "dotenv";
dotenv.config();
//import { routes } from "./routes";
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_CONNECT);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));

app.use("/cart", cartRouter);
app.listen(process.env.PORT,()=>{
    console.log(`Cart is connected to ${process.env.PORT}`);
});
