import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function (req,res,next){
  const token = req.header('auth-token');
  if(!token){
    return res.status(401).send("Access Denied");
  }
  try{
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  }
  catch(err){
    return res.status(400).send(err);
  }
}
