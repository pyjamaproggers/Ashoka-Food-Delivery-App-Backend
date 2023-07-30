import client from "../db.js";
import { ObjectId } from "mongodb";

export const getOrders = async (req, res) => {
    try {
        const Restaurant = req.params.Restaurant;
        const collection = client.db("AshokaEats").collection("orders");
        const query = Restaurant ? { Restaurant } : {};

        const data = await collection.find(query).toArray();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json(error);
    }
};

export const addOrder = async (req, res) => {
    console.log("Adding Order")
    try {
        const collection = client.db("AshokaEats").collection("orders");
        const order = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            Restaurant: req.body.Restaurant,
            orderAmount: req.body.orderAmount,
            orderItems: req.body.orderItems,
            orderDate: req.body.orderDate,
            orderInstructions: req.body.orderInstructions,
            orderStatus: req.body.orderStatus,
            orderType: req.body.type,
            payment: req.body.payment,
            deliveryLocation: req.body.DeliveryLocation
        };
        await collection.insertOne(order);
        return res.json("Order has been created.");
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json(error);
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.orderId; // Assuming we pass the order ID in the URL
        const newStatus = req.body.status; // Assuming we pass the new status in the request body
        console.log("Update status req")

        if (!orderId || !newStatus) {
            return res.status(400).json({ message: "Order ID and status are required." });
        }

        const collection = client.db("AshokaEats").collection("orders");

        // Convert the raw string orderId to ObjectId
        const objectIdOrderId = new ObjectId(orderId); // Add 'new' keyword here

        const result = await collection.updateOne(
            { _id: objectIdOrderId },
            { $set: { orderStatus: newStatus } }
        );

        if (result.modifiedCount === 1) {
            return res.json("Order status has been updated.");
        } else {
            return res.status(404).json({ message: "Order not found." });
        }
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json(error);
    }
};