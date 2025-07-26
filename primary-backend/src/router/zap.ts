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
       const zap = await tx.zap.create({
            data:{
                triggerId:"",
                actions: {
                    create: parsedData.data.actions.map((x,index) => ({
                        actionId:x.availableActionId,
                        sortingOrder: index
                    }))
                }
            }
        })

        const trigger = await tx.trigger.create({
            data:{
                triggerId: parsedData.data.availableTriggerId,
                zapId:zap.id
            }
        })

        await tx.zap.update({
            where:{
                id:zap.id
            },
            data:{
                triggerId: trigger.id
            }
        })
    })
})

route.get("/",authMiddleware,(req,res) => {
    console.log("signin created");
})

route.get("/:zapId",authMiddleware,(req,res) => {
    console.log("specific zap");
})

export const zapRouter = route