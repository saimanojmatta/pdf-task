import mongoose from "mongoose";
import express from 'express'
import dotenv from 'dotenv'
import pdfrouter from './routes/pdf.js'
import authrouter from './routes/authrouter.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { verifytoken } from "./utills/verifyuser.js";
dotenv.config()
mongoose.connect(process.env.Mongo).then(()=>{
    console.log('Connected to Mongodb!')
}).catch((err)=>{
    console.log(err)
})
const app=express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.use('/files',express.static('files'))
app.use('/api/auth',authrouter)
app.use('/api',pdfrouter)
app.get('/',async(req,res)=>{
    res.send('success!')
})
//errorhandler middleware
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500
    const message=err.message||"Internal server error"
    return res.status(statusCode).json({success:false,statusCode,message})
})
app.listen(5000,()=>{
    console.log('server runninng on port 5000')
})