import { Router } from 'express'
import { authMiddleware } from '../middleware';
import { ZapCreateSchema } from '../types';
import { prismaClient } from '../db';

const route = Router();

route.post("/",authMiddleware,async (req,res) => {
    const body = req.body;
    const parsedData = ZapCreateSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    await prismaClient.$transaction(async tx => {
        
    })
})

route.get("/",authMiddleware,(req,res) => {
    console.log("signin created");
})

route.get("/:zapId",authMiddleware,(req,res) => {
    console.log("specific zap");
})

export const zapRouter = route