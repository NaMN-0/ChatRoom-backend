import express from "express";
import User from "../model/User.js";
import dotenv from "dotenv";

import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const router = express.Router();

router.post("/uploadDP", (req, res) => {
  const id = req.body.id;
  const imgUrl = req.body.imgUrl;
  console.log(id, imgUrl);
  User
    .findByIdAndUpdate(id,{$set:{imgUrl:imgUrl}},{new:true})
    .then(docs => {
      if(docs){
        console.log(docs);
        res.send(docs);
      }
      else{
        console.log('err1');
        res.send({msg : "Some Error occured!"});
      }
    })
    .catch(err => {
      console.log('err2');
      res.send({msg : "Some Error occured!"});
    });    
});

export default router;