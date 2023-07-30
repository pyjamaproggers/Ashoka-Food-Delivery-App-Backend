import express from "express";
import {
    addUnavailableItem,
    getUnavailableItems,
    deleteUnavailableItem
} from "../controllers/items.js";

const itemsRouter = express.Router();

itemsRouter.post("/", (req, res, next) => {
    // Set CORS headers
    //   res.set("Access-Control-Allow-Origin", "https://appurl"); 
    //   res.set("Access-Control-Allow-Credentials", "true");
    next();
}, addUnavailableItem);

itemsRouter.get("/:restaurant", (req, res, next) => {
    // Set CORS headers
    //   res.set("Access-Control-Allow-Origin", "https://appurl"); 
    //   res.set("Access-Control-Allow-Credentials", "true");
    next();
}, getUnavailableItems);

itemsRouter.delete("/", (req, res, next) => {
    // Set CORS headers
    //   res.set("Access-Control-Allow-Origin", "https://appurl"); 
    //   res.set("Access-Control-Allow-Credentials", "true");
    next();
}, deleteUnavailableItem);

export default itemsRouter;