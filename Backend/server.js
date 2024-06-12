const express = require("express")
const dotenv= require("dotenv")
const cookieParser= require("cookie-parser")
const app= express()


const authRoute = require("./routes/auth")
const ConnectMongo = require("./db/ConnectMongodb")
 dotenv.config()

 app.use(express.json())
 app.use(cookieParser());

//Connect mongodb
 ConnectMongo();

app.get("/",(req,res)=>{
    return res.send("Hello World")
})

app.use("/v1/auth",authRoute)

app.listen(process.env.PORT || 5000,()=>{

    console.log("Server is running ");


})