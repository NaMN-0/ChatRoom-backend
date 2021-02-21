import express from "express";
import Chat from "../model/chat.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/getMsgs", (req,res) => {
  const chatID = req.query.chatID;
  Chat
    .findOne(
      {chatID:chatID}
    )
    .then(doc => {
      if(doc){
        res.send(doc.body);
      }
      else{
        res.send([]);
      }
    })
    .catch(err => {
      throw err;
    })
});

router.post("/sendMsg", (req,res) => {
  const chatID = req.body.chatID;
  const msgText = req.body.msgText;
  const author = req.body.author;
  const newMsg = {
    author : author,
    msgText : msgText,
    date : Date.now()
  }
  Chat
    .findOne(
      {chatID:chatID},
    )
    .then(doc => {
      if(doc){
        let newBody = [...doc.body, newMsg];
        Chat
          .findOneAndUpdate({chatID:chatID},{body:newBody},{new:true})
          .then(docs => {
            if(docs){
              res.send(docs);
            }
            else{
              res.send({msg : "Some Error occured!"});
            }
          })
          .catch(err => {
            throw err;
          })
      }
      else{
        let newDoc = new Chat({
          chatID:chatID,
          body:[newMsg]
        });
        newDoc
          .save()
          .then(doc => {
            res.send(doc)
          })
          .catch(err => {
            throw err;
          })
      }
    })
    .catch(err => {
      throw err;
    })
});

export default router;