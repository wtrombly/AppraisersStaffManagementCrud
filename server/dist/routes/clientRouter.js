"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRouter = void 0;
const express_1 = __importDefault(require("express"));
const clientModel = __importStar(require("../models/client"));
const clientRouter = express_1.default.Router();
exports.clientRouter = clientRouter;
clientRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    clientModel.findAll((err, clients) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }
        console.log("clientRouter.get function has been called");
        res.status(200).json({ "data": clients });
    });
}));
clientRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newClient = req.body;
    clientModel.create(newClient, (err, client_id) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "id": client_id });
    });
}));
clientRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    clientModel.findOne(id, (err, client) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": client });
    });
}));
clientRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = req.body;
    const id = Number(req.params.id);
    console.log(Number(req.params.id));
    console.log("Updating order with id", id);
    clientModel.update(client, id, (err) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).send();
    });
}));
clientRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    clientModel.remove(id, (err) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "id": id });
    });
}));
