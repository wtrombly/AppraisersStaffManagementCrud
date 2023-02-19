
import express, {Request, Response} from "express";
import * as appraiserModel from "../models/appraiser";
import {Appraiser, BasicAppraiser} from "../types/appraiser";
const appraiserRouter = express.Router();

appraiserRouter.get("/", async (req: Request, res: Response) => {
  appraiserModel.findAll((err: Error, appraisers: Appraiser[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json({"data": appraisers});
  });
});

appraiserRouter.post("/", async (req: Request, res: Response) => {
  const newAppraiser: Appraiser = req.body;
  appraiserModel.create(newAppraiser, (err: Error, emp_id: number) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"emp_id": emp_id});
  });
});

appraiserRouter.get("/:id", async (req: Request, res: Response) => {
  const emp_id: number = Number(req.params.id);
  appraiserModel.findOne(emp_id, (err: Error, appraiser: Appraiser) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"data": appraiser});
  })
});

appraiserRouter.put("/:id", async (req: Request, res: Response) => {
  const appraiser: Appraiser = req.body;
  appraiserModel.update(appraiser, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).send();
  })
});

export {appraiserRouter};
