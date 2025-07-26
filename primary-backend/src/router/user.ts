import { Router } from 'express'
import { authMiddleware } from '../middleware';
import { SignupSchema } from '../types';

const route = Router();

route.post("/signup",(req,res) => {
    const body = req.body.username;
    const parsedData = SignupSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
})

route.post("/signin",(req,res) => {
    console.log("signin created");
})

route.get("/user",authMiddleware,(req,res) => {
    console.log("signin handler");
})

export const userRouter = route
