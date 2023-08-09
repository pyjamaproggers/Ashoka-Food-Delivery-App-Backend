import client from "../db.js";

export const passwordAuth = async (req, res) => {
    try {
        const restaurant = req.params.restaurant;
        const givenPassword = req.body.password
        const collection = client.db("AshokaEats").collection("vendorpasswords");
        const query = restaurant ? { Restaurant : restaurant } : {};
        const data = await collection.findOne(query)
        if(data.password===givenPassword)
        {
            return res.status(200);
        }
        else
        {
            return res.status(401);
        }
        
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json(error);
    }
};