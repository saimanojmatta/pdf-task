import bcryptjs from 'bcryptjs'
import User from '../Models/Usermodel.js'
import jwt from 'jsonwebtoken'
import { errorhandler } from '../utills/error.js'
export const signup=async(req,res,next)=>{
    const{username,email,password}=req.body
    const hashedpassword=bcryptjs.hashSync(password,10)
    try{
        const user=await User.create({
            username,
            email,
            password:hashedpassword
        })
        res.status(201).json({message:"a user created😃!"})
    }
    catch(err){
        next(err)
    }
}
export const signin=async(req,res,next)=>{
    const{email,password}=req.body
    try{
       const validuser= await User.findOne({email})
       if(!validuser) return next(errorhandler(404,'User not found!'))
       const validpassword=bcryptjs.compareSync(password,validuser.password)
       if(!validpassword) return next(errorhandler(401,"wrong credentials!"))
       const token=jwt.sign({id:validuser._id},process.env.JWT_SECRET)
       const{password:pass,...rest}=validuser._doc
       res.cookie("Accesstoken",token,{httpOnly:true}).status(200).json(rest)
   }catch(err){
    next(err)
   }
}
export const signout=async(req,res,next)=>{
    try{
        res.clearCookie("Accesstoken")
        res.status(200).json("user has been loged out!")
    }catch(err){
        next(err)
    }
}