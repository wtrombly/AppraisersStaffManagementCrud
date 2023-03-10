
import express, {Request, Response} from "express";
import * as clientModel from "../models/client";
import { Client } from "../types/client";
const clientRouter = express.Router();

clientRouter.get("/", async (req: Request, res: Response) => {
  clientModel.findAll((err: Error, clients: Client[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    console.log("clientRouter.get function has been called")
    res.status(200).json({"data": clients});
  });
});


clientRouter.post("/", async (req: Request, res: Response) => {
  const newClient: Client = req.body;
  clientModel.create(newClient, (err: Error, client_id: number) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"id": client_id});
  });
});

clientRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  clientModel.findOne(id, (err: Error, client: Client) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": client});
  })
});

clientRouter.put("/:id",  async (req: Request, res: Response) => {
  const client: Client = req.body;
  const id: number = Number(req.params.id);
  console.log(Number(req.params.id));
  console.log("Updating order with id", id);
  clientModel.update(client, id, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).send();
  })
});

clientRouter.delete("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  clientModel.remove(id, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"id": id});
  });
});

export {clientRouter};
