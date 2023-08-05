import client from "../db.js";
import { ObjectId } from "mongodb";
import { io } from "../index.js";

export const addUnavailableItem = async (req,res) => {
    console.log('Adding unavailable item')
    try {
        const collection = client.db("AshokaEats").collection("unavailableItems");
        const item = {
            name: req.body.name,
            restaurant: req.body.restaurant
        }
        await collection.insertOne(item)
        io.emit("unavailableItemsListUpdated", item);
        console.log("Emitted Unavailable Items List Updated")
        return res.json("Unavailable item inserted")
    } catch (error) {
        console.error('Unable to add unavailable item')
        return res.status(500).json(error)
    }
}

export const deleteUnavailableItem = async (req,res) => {
    console.log('Adding unavailable item')
    try {
        const collection = client.db("AshokaEats").collection("unavailableItems");
        const item = {
            name: req.body.name,
            restaurant: req.body.restaurant
        }
        await collection.deleteOne(item)
        io.emit("unavailableItemsListUpdated", item);
        console.log("Emitted Unavailable Items List Updated")
        return res.json("Unavailable item deleted")
    } catch (error) {
        console.error('Unable to add unavailable item')
        return res.status(500).json(error)
    }
}

export const getUnavailableItems = async (req, res) => {
    try {
        const restaurant = req.params.restaurant;
        const collection = client.db("AshokaEats").collection("unavailableItems");
        const query = restaurant ? { restaurant } : {};

        const data = await collection.find(query).toArray();
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json(error);
    }
};
