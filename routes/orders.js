import express from "express";
import {
  addOrder,
  getOrdersForRestaurant,
  getOrdersForUser,
  updateOrderStatus
} from "../controllers/orders.js";

const router = express.Router();

router.get("/restaurants/:Param", (req, res, next) => {
  // Set CORS headers
//   res.set("Access-Control-Allow-Origin", "https://appurl"); 
//   res.set("Access-Control-Allow-Credentials", "true");
  next();
}, getOrdersForRestaurant);

router.get("/users/:Param", (req, res, next) => {
  // Set CORS headers
//   res.set("Access-Control-Allow-Origin", "https://appurl"); 
//   res.set("Access-Control-Allow-Credentials", "true");
  next();
}, getOrdersForUser);

router.post("/", (req, res, next) => {
  // Set CORS headers
//   res.set("Access-Control-Allow-Origin", "https://appurl"); 
//   res.set("Access-Control-Allow-Credentials", "true");
  next();
}, addOrder);

router.put("/:orderId/status", (req, res, next) => {
  // Set CORS headers
//   res.set("Access-Control-Allow-Origin", "https://appurl"); 
//   res.set("Access-Control-Allow-Credentials", "true");
  next();
}, updateOrderStatus);

export default router;