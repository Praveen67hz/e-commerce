const express = require("express");
const Product = require("../Models/Product");
const router = express.Router();

 
router.get("/all", async(req,res) => {
    try{
        const products = await Product.find();
        res.json(products);
    }   
    catch(err){
       res.status(500).json({message: "Failed to fetch products"});
    }  
});

router.post("/addproduct", async(req,res) => {
    try{
        const newProduct = req.body;
        const exist = await Product.findOne({id:newProduct.id});
        if(exist)
        {
            res.status(400).json({message:"Product ID already exists"});
        }

        const createProduct = await Product.create(newProduct);
        res.status(201).json(createProduct);
    }
    catch(err)
    {
       res.status(500).json({message:"failed to add product",error:err.message});
    }
});

module.exports = router;

