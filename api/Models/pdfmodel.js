import mongoose from "mongoose";
const pdfdetailschema=new mongoose.Schema(
    {
        pdf:{
            type:String,
            required:true
        },
    }
)
const pdfdetails=mongoose.model("pdfdetails",pdfdetailschema)
export default pdfdetails