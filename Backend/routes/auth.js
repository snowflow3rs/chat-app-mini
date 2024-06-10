const authController = require("../controller/authController")

const router =  require("express").Router()


 router.get("/login",authController.loginUser)
 router.post("/register",)
 router.post("/logout",)
 router.post("/refresh",)

 module.exports= router