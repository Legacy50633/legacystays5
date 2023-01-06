const express = require("express")
const mongoose = require("mongoose")
mongoose.set('strictQuery',true)
mongoose.connect("mongodb://0.0.0.0:27017/death",{
    useUnifiedTopology:true,
    useNewUrlParser:true
})

const Schema = mongoose.Schema
const deathSchema = new Schema ({
    name:{
        type:String,
        require:true
    },
    date:{
        type:Number,
        required:true
    },
    time:{
        type:Number,
        required:true

    },
    
    cause:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Death",deathSchema)