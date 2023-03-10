import * as dotenv from 'dotenv';
import express from 'express';
import * as bodyParser from 'body-parser';
import { appraiserRouter } from './routes/appraiserRouter';
import cors from 'cors';
import { orderRouter } from './routes/orderRouter';
import { clientRouter } from './routes/clientRouter';

const app = express();
dotenv.config();

// any website can access this locally due to this line of code
app.use(cors());


app.use(bodyParser.json());

app.use('/appraisers', appraiserRouter);

app.use('/orders', orderRouter);

app.use('/clients', clientRouter);

app.listen(process.env.PORT, () => {
  console.log('Node server started running');
});
