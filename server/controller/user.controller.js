const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");

module.exports.signup = async (req, res) => {
  console.log("dfa",req.body);
  try {
    const User = req.body;
    const user = await userModel.findOne({ email: User.email });
    if (user) {
      res.status(400).json({ message: "User already exists" });
    } else {
      await userModel.create(User);
      res.status(201).json({ message: "SIGNUP Success", User });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.signin = async (req, res) => {
  console.log(req.body);
  try {
    const User = req.body;
    const user=await userModel.findOne({ email: User.email });
    if (user) {
        const auth=bcrypt.compare(User.password,user.password)
        console.log(auth)
        if (auth) {
          res.status(200).json({ message: "Sign in success", data: user });
        }else{
          res.status(401).json({ message: "Invalid password" });
        }
    }else{
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
