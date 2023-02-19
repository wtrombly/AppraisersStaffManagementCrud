import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import {orderRouter} from "./routes/orderRouter";
import { appraiserRouter } from "./routes/appraiserRouter";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/orders", orderRouter);
app.use("/appraisers", appraiserRouter);


app.listen(process.env.PORT, () => {
console.log("Node server started running");
});
