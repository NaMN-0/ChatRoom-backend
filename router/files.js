import express from "express";
import User from "../model/user.js";
import dotenv from "dotenv";

import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const router = express.Router();

const folderPath = "./public/profileImgs";

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null,folderPath);
  },
  filename: (req,file,cb) => {
    cb(null, uuidv4()+path.extname(file.originalname));
  }
});

const fileFilter = (req,file,cb) => {
  if(file.mimetype=="image/jpeg" || file.mimetype=="image/png"){
    cb(null,true);
  }
  else{
    cb(null,false);
  }
}

const upload = multer({storage: storage, fileFilter: fileFilter});
const rootUrl = "http://localhost:8000";

router.post("/uploadDP",upload.single('file'), (req, res) => {
  const id = req.body.id;
  const fileName = `${rootUrl}/profileImgs/${req.file.filename}`;
  User
    .findByIdAndUpdate(id,{$set:{imgUrl:fileName}},{new:true})
    .then(docs => {
      if(docs){
        res.send(docs);
      }
      else{
        res.send({msg : "Some Error occured!"});
      }
    })
    .catch(err => {
      res.send({msg : "Some Error occured!"});
    });    
});

export default router;