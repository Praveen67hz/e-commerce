const express = require("express");
const verifyToken = require("../Middlewares/authMiddleware");

const router = express.Router();

router.get("/profile", verifyToken, (req, res) =>{
     res.json({
        message:"Access granted to protected route",
        user:req.user,
     });
});

module.exports = router;