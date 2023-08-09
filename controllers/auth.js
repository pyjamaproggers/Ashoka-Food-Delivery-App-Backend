import client from "../db.js";

export const passwordAuth = async (req, res) => {
    try {
        const restaurant = req.params.restaurant;
        const givenPassword = req.body.password;
        const collection = client.db("AshokaEats").collection("vendorpasswords");
        const query = restaurant ? { Restaurant: restaurant } : {};
        const data = await collection.findOne(query);
        if (!data) {
            return res.status(401).json({ verified: false }); // Restaurant not found
        }
        const passwordMatch = data.Password === givenPassword;
        return res.status(200).json({ verified: passwordMatch });

    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ verified: false, error: "Internal server error." });
    }
};
