import express from "express";
import verify from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", verify, (req,res) => {
  res.status(200).json({"isLogin" : true});
})

export default router;