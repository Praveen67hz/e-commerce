const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");;
const User = require("../Models/User");
const verifyToken = require("../Middlewares/authMiddleware");

const  router = express.Router();

router.get("/user", verifyToken, async(req,res) =>{
   try{
       const  get = await User.find({}, '-password');
       res.json(get);
   }
   catch(err){
      res.status(500).json({message:"Failed to fetch the products"});
   }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: role === "admin" 
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
});


router.post("/login", async(req,res) => {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({email});
      if(!user) return res.status(404).json({message: "User not found"});

      const isPasswordValid = await bcrypt.compare(password,user.password);
      if(!isPasswordValid) return res.status(401).json({message:"Invalid password"});

      const token = jwt.sign(
         {id:user._id, isAdmin: user.isAdmin},
         process.env.JWT_SECRET,
         {expiresIn: "1d"}
      );

      res.status(200).json({
        token,
        user: {
            id:user._id,
            name: user.name,
            email:user.email,
            isAdmin: user.isAdmin,
        },
      });
    } catch (err) {
        res.status(500).json({message: "Login failed",error:err.message});
    }
});

module.exports = router;