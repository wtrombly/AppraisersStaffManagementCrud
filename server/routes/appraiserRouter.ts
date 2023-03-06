
import express, {Request, Response} from "express";
import * as appraiserModel from "../models/appraiser";
import {Appraiser} from "../types/appraiser";
const appraiserRouter = express.Router();

appraiserRouter.get("/", async (req: Request, res: Response) => {
  appraiserModel.findAll((err: Error, appraisers: Appraiser[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }
    console.log("appraiserRouter.get function has been called")
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

appraiserRouter.put("/:id",  async (req: Request, res: Response) => {
  const appraiser: Appraiser = req.body;
  const emp_id: number = Number(req.params.id);
  console.log(Number(req.params.id));
  console.log("Updating appraiser with emp_id", emp_id);
  appraiserModel.update(appraiser, emp_id, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).send();
  })
});

appraiserRouter.delete("/:emp_id", async (req: Request, res: Response) => {
  const emp_id: number = parseInt(req.params.emp_id);

  appraiserModel.remove(emp_id, (err: Error) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"emp_id": emp_id});
  });
});

export {appraiserRouter};
