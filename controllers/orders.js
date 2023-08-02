import client from "../db.js";
import { ObjectId } from "mongodb";
import { io } from "../index.js";

export const getOrdersForUser = async (req, res) => {
    try {
        const param = req.params.Param;
        const collection = client.db("AshokaEats").collection("orders");
        const query = param ? { email : param } : {};

        const data = await collection.find(query).toArray();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json(error);
    }
};

export const getOrdersForRestaurant = async (req, res) => {
    try {
        const param = req.params.Param;
        const collection = client.db("AshokaEats").collection("orders");
        const query = param ? { Restaurant : param } : {};

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
            deliveryLocation: req.body.deliveryLocation
        };
        await collection.insertOne(order);
        io.emit("newOrder", order);
        console.log("Emitted New Order")
        return res.json("Order has been created.");
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json(error);
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const newStatus = req.body.status;
        
        if (!orderId || !newStatus) {
            return res.status(400).json({ message: "Order ID and status are required." });
        }

        const collection = client.db("AshokaEats").collection("orders");

        const objectIdOrderId = new ObjectId(orderId);

        // Fetch the updated order from the database after the update
        const updatedOrder = await collection.findOneAndUpdate(
            { _id: objectIdOrderId },
            { $set: { orderStatus: newStatus } },
            { returnOriginal: false } // This option ensures that the updated document is returned
        );

        if (updatedOrder.value) {
            io.emit("orderStatusChange", updatedOrder.value);
            if(newStatus=="completed")
            {
                console.log("Emitting Completed Order")
                io.emit("orderComplete", updatedOrder.value)
            }
            return res.json({ message: `Order status has been updated: Order ID: ${objectIdOrderId}`, order: updatedOrder.value });
        } else {
            return res.status(404).json({ message: `Order not found: ${objectIdOrderId}` });
        }
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json(error);
    }
};
