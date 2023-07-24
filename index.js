import express from "express"
import orderRoutes from "./routes/orders.js"
const app = express()

app.use(express.json());

app.use("/api/orders", orderRoutes)

app.listen(8800, ()=>{
    console.log("Connected!")
})