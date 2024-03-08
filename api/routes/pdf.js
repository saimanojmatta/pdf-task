import express from 'express'
import  multer from 'multer'
import {  deletefile, getfiles,  uploadfile } from '../controller/pdfcontroller.js'
import { verifytoken } from '../utills/verifyuser.js';
const router=express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./files");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });
const  upload=multer({storage:storage})
const uploadmiddleware=upload.single('file')
router.post('/upload-file',uploadmiddleware,uploadfile)
router.get('/get-files',getfiles)
router.delete('/delete-file/:filename',deletefile)
export default router