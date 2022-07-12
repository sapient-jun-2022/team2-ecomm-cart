import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cartRouter from "./routes/cartRoutes";
import * as dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3002;
//import { routes } from "./routes";
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_CONNECT);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));

app.use("/cart", cartRouter);
app.listen(PORT,()=>{
    console.log(`Cart is connected to ${PORT}`);
});
