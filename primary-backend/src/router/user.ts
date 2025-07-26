import { Router } from 'express'
import { authMiddleware } from '../middleware';
import { SigninSchema, SignupSchema } from '../types';
import { prismaClient } from '../db';
import jwt from 'jsonwebtoken'
import { JWT_PASSWORD } from '../config';
import { email } from 'zod';

const route = Router();

route.post("/signup",async (req,res) => {
    const body = req.body;
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

    await prismaClient.user.create({
        data:{
            name:parsedData.data.name,
            email:parsedData.data.username,
            password:parsedData.data.password
        }
    })

    // TODO: sendEmail()

    return res.status(200).json({
        message:"Verify your email"
    })
})

route.post("/signin",async (req,res) => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }

    const user = await prismaClient.user.findFirst({
        where:{
            email:parsedData.data.username,
            password:parsedData.data.password
        }
    })

    if(!user){
        return res.json({
            message:"Invalid credentials"
        })
    }

    // JWT

    const token =  jwt.sign({
        id:user.id
    },JWT_PASSWORD)

    return res.json({
        token:token
    })
})

route.get("/user",authMiddleware,async (req,res) => {
    //TODO: fix this type
    //@ts-ignore
   const id = req.id;

   const user = await prismaClient.user.findFirst({
    where:{
        id
    },
    select:{
        name:true,
        email:true
    }

   })

   return res.json({
    user
   })

})

export const userRouter = route
