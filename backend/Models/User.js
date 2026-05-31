const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required: true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: function () {
        return !this.googleId;
       }
    },
    googleId: {
        type: String,  
        unique: true,
        sparse: true   
    },
    image: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
},{timestamps: true});

module.exports = mongoose.model("User", userSchema);
