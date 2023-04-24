const express = require("express");
const cors = require ("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const ProductJson = require("./sample_data.json");
const path = require('path');

const app = express()
app.use(cors())

const PORT = process.env.PORT || 8080

app.get("/",(req,res)=>{
    res.send("Server is running")
})

//MONGODB

mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("connect to Database"))
.catch((err)=>console.log(err))

const productSchema = new mongoose.Schema({

    id : {
        type : Number,
    },

    first_name: {
        type : String,
    },

    last_name: {
        type : String,
    },

    email: {
        type: String,
    },

    gender : {
        type: String,
    },

    income: {
        type : String,
    },

    city:{
        type : String,
    } ,
    car:{
        type : String,
    } ,
    quote:{
        type : String,
    } ,
    phone_price:{
        type : Number,
    } ,

}) 


//transfer to mongoDB
const Product = mongoose.model("user",productSchema)
const start = async () =>{
    try{
        await Product.create(ProductJson);
        console.log("success");
    }
    catch(error){
    console.log(error);
    }
}
start();
//fetch data

app.get("/user",async(req,res) => {

        const data  = await Product.find({});
        res.send(JSON.stringify(data));
        console.log("transfered");
})


app.listen(PORT,()=>console.log("server is running at port : " + PORT))

