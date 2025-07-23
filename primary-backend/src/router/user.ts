import { Router } from 'express'
import { authMiddleware } from '../middleware';

const route = Router();

route.post("/signup",(req,res) => {
    console.log("signup created");
})

route.post("/signin",(req,res) => {
    console.log("signin created");
})

route.get("/user",authMiddleware,(req,res) => {
    console.log("signin handler");
})

export const userRouter = route
