import express from 'express';
import { PrismaClient } from '@prisma/client';
const client = new PrismaClient()

const app = express ();
app.use(express.json())

app.post("/hooks/catch/:userId/:zapId",async (req,res) =>{
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body
    

   await client.$transaction(async (tx:any) => {
    const run = await tx.zapRun.create({
        data:{
            zapId:zapId,
            metadata: body
        }
    })

    await tx.zapRunOutBox.create({
    data:{
        zapRunId: run.id
    }
   })
   })
   res.json({
    message:"Webhook Received"
   })
})

app.listen(3000);