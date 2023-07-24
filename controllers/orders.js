import client  from "../db.js";

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
          deliveryLocation: req.body.DeliveryLocation
        };
              await collection.insertOne(order);
              return res.json("Order has been created.");
      } catch (error) {
          console.error("Error executing query:", error);
          return res.status(500).json(error);
      }
  };