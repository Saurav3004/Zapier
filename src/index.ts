import express from 'express';

const app = express ();

app.post("/hooks/cache/:userId/:zapId",(req,res) =>{
    const userId = req.params.userId;
    const zapId = req.params.zapId;


})