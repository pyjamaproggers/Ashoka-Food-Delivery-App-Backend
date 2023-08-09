import express from "express"
import {
    passwordAuth
} from "../controllers/auth.js";

const authRouter = express.Router()

authRouter.post("/:restaurant", (req, res, next)=>{
    next()
}, passwordAuth);


export default authRouter;