import express from "express"
import orderRoutes from "./routes/orders.js"
import itemRoutes from "./routes/items.js"

const app = express()

app.use(express.json());

app.use("/api/orders", orderRoutes)
app.use("/api/items", itemRoutes)

app.listen(8800, ()=>{
    console.log("Connected!")
})