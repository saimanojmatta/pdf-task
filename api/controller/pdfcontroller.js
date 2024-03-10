import pdfdetails from "../Models/pdfmodel.js"
import fs from 'fs';
import path from 'path';
const filedir='./files'
export const uploadfile=async(req,res,next)=>{
  // console.log(req.file)
  const filename=req.file.filename
 try{
  const PDFdetails=pdfdetails.create({
    pdf:filename,
  })
  res.status(201).json({message:"pdf detaile are saved!"})
 }catch(err){
  next(err)
 }
}
export const getfiles=async(req,res,next)=>{
  try{
   const Data=await  pdfdetails.find({})
   res.send({status:"ok",data:Data})
  }catch(err){
    next(err)
  }
}

export const deletefile=async(req,res,next)=>{
  const{filename}=req.params
  const filepath=path.join(filedir,filename)
  try {
    if (fs.existsSync(filepath)) {
      await fs.promises.unlink(filepath); 
      await pdfdetails.findOneAndDelete({pdf:filename})
      console.log(`${filename} has been deleted successfully.`);
      return res.status(200).json({ message: `${filename} has been deleted successfully.` });
    } else {
      return res.status(404).json({ message: "File not found!" });
    }
  } catch (err) {
    console.error(`Error deleting file: ${err}`);
    return res.status(500).json({ message: "Error deleting file" });
  }
}