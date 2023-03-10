
import express, {Request, Response} from "express";
import * as orderModel from "../models/order";
import {Order } from "../types/order";
const orderRouter = express.Router();

orderRouter.get("/", async (req: Request, res: Response) => {
  orderModel.findAll((err: Error, orders: Order[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    console.log("orderRouter.get function has been called")
    res.status(200).json({"data": orders});
  });
});


orderRouter.post("/", async (req: Request, res: Response) => {
  const newOrder: Order = req.body;
  orderModel.create(newOrder, (err: Error, id: number) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"id": id});
  });
});

orderRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  orderModel.findOne(id, (err: Error, order: Order) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": order});
  })
});

orderRouter.put("/:id",  async (req: Request, res: Response) => {
  const order: Order = req.body;
  const id: number = Number(req.params.id);
  console.log(Number(req.params.id));
  console.log("Updating order with id", id);
  orderModel.update(order, id, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).send();
  })
});

orderRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  orderModel.remove(id, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"id": id});
  });
});

export {orderRouter};
