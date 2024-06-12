const User = require("../model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const authController = {
    registerUser: async (req, res) => {
        try {

            const { username, email, password, confirmPassword, gender } = req.body
            if (password !== confirmPassword) {

                res.status(400).json({ message: "Password not match" })

            }
            const user = await User.findOne({ username })
            if (user) {

                res.status(400).json({ message: "Username is already exit " })


            }


            const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`
            const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`

            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(password, salt)
            const newUser = await new User({
                username,
                email,
                password: hashedPass,
                gender,
                profilePic: gender === "male" ? boyPic : girlPic,

            })
            await newUser.save()
            res.status(200).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        } catch (error) {
            res.status(500).json(err.message)
        }
    },
    generateToken: (userId, res) => {

        const token = jwt.sign(
            {
                userId
            }
            , process.env.SECRET_JWT_KEY,
            { expiresIn: "1h" }
        )

        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        })
    },

    loginUser: async (req, res) => {

        try {

            const { email, password } = req.body
            const user = await User.findOne({ email })
            const validPass = await bcrypt.compare(password, user?.password||"")
            if (!user || !validPass) {

                res.status(500).json({ message: "invalid username or password" })
            }
            
            authController.generateToken(user._id, res)

            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic

            })

        } catch (error) {
            res.status(500).json(err.message)
        }

    },
    logoutUser: (req, res) => {
        try {
            res.clearCookie("jwt")
            res.status(200).json({ message: "Logged out Successfully " })
        } catch (error) {
            res.status(500).json(err.message)
        }
    },
 

}

module.exports = authController