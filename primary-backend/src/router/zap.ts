import { Router } from 'express'
import { authMiddleware } from '../middleware';

const route = Router();

route.post("/",authMiddleware,(req,res) => {
    console.log("create a zap");
})

route.get("/",authMiddleware,(req,res) => {
    console.log("signin created");
})

route.get("/:zapId",authMiddleware,(req,res) => {
    console.log("specific zap");
})

export const zapRouter = route