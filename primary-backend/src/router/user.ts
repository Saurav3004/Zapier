import { Router } from 'express'
import { authMiddleware } from '../middleware';
import { SignupSchema } from '../types';
import { prismaClient } from '../db';

const route = Router();

route.post("/signup",async (req,res) => {
    const body = req.body.username;
    const parsedData = SignupSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const userExists = await prismaClient.user.findFirst({
        where:{
            email: parsedData.data.username
        }
    })

    if(userExists){
        return res.status(403).json({
            message: "User already exists"
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
