import * as dotenv from 'dotenv';
import express from 'express';
import * as bodyParser from 'body-parser';
import { appraiserRouter } from './routes/appraiserRouter';
import cors from 'cors';
import { orderRouter } from './routes/orderRouter';

const app = express();
dotenv.config();

// any website can access this locally due to this line of code
app.use(cors());


app.use(bodyParser.json());

app.use('/appraisers', appraiserRouter);

app.use('/orders', orderRouter);

app.listen(process.env.PORT, () => {
  console.log('Node server started running');
});
