import express from "express";
import User from "../model/user.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/detail", async (req, res) => {
  const id = req.query.id;
  const user = await 
    User
      .findOne({_id : id})
      .catch(err => {
        res.send({msg : "Some Error occured!"});
      });
  if(!user){
    return res.status(200).send({msg : "User does not exist"});
  }
  res.status(200).send(user);
});

router.get("/search", async (req, res) => {
  const query = req.query.query;
  const user = await 
    User
      .findOne({username : query})
      .catch(err => {
        res.send({msg : "Some Error occured!"});
      });
  if(!user){
    return res.status(200).send({msg : "User does not exist"});
  }
  res.status(200).send(user);
});

router.put("/addPeople", async (req, res) => {
  const id1 = req.query.id1;
  const id2 = req.query.id2;
  let updatedPeople = [];
  User.findById(id1)
    .then(user => {
      User.findById(id2)
        .then(user2 => {
          updatedPeople = [...user.people,user2];
          User
          .findByIdAndUpdate(id1,{$set:{people:updatedPeople}},{new:true})
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
        })
        .catch(err => {
          res.send({msg : "Some Error occured!"});
        })
    })
    .catch(err => {
      res.send({msg : "Some Error occured!"});
    })
});

router.put("/editProfile", async (req, res) => {
  const id = req.body.id;
  const change = req.body.change;
  User
  .findByIdAndUpdate(id,{$set:change},{new:true})
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