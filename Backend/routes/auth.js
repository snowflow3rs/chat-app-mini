const authController = require("../controller/authController")

const router =  require("express").Router()


 router.post("/login",authController.loginUser)
 router.post("/register",authController.registerUser)
 router.post("/logout", authController.logoutUser)
 router.post("/refresh",)

 module.exports= router