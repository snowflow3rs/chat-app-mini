const express = require("express")
const dotenv= require("dotenv")
const cookieParser= require("cookie-parser")

const app= express()

const PORT = process.env.PORT || 5000
const authRoute = require("./routes/auth")
const ConnectMongo = require("./db/ConnectMongodb")
 dotenv.config()

 app.use(express.urlencoded({extended:true}))

//Connect mongodb
 ConnectMongo();

app.get("/",(req,res)=>{
    return res.send("Hello World")
})

app.use("/v1/auth",authRoute)

app.listen(PORT,()=>{

    console.log(`Server is running at port ${PORT}`);


})