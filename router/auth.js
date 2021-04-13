import express from "express";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { registerValidation, loginValidation } from "../validation.js";

dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  // Validation of Input
  const { error } = registerValidation(req.body);
  if(error){
    return res.status(200).send({msg : error.details[0].message});
  }

  // Check if password and re_password are same
  if(req.body.password!=req.body.re_password){
    return res.status(200).send({msg : "Password and Re-enter Password do not match"});
  }

  // Check if user already exists
  const usernameExist = await User.findOne({username : req.body.username});
  if(usernameExist){
    return res.status(200).send({msg : "Username already Exists"});
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Add new User
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword,
    dateJoined: req.body.dateJoined,
    newUser: true
  });
  try{
    const savedUser = await newUser.save();
    res.status(200).json({
      id: savedUser._id
    });
  }
  catch (err){
    res.status(400).json({
      msg : err
    });
  }
});

router.post("/login", async (req, res) => {
  // Validation of Input
  const { error } = loginValidation(req.body);
  if(error){
    return res.status(200).send({msg : error.details[0].message});
  }

  // Check if user exists
  const user = await User.findOne({username : req.body.username});
  if(!user){
    return res.status(200).send({msg : "Email does not exists"});
  }

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass){
    return res.status(200).send({msg : "Password is incorrect"});
  }

  // Create and assign token
  const token = jwt.sign({_id : user._id, name : user.name, username : user.username}, process.env.JWT_SECRET, {expiresIn: "1hr"});
  res.status(200).send({id : user._id, token : token});
});


export default router;