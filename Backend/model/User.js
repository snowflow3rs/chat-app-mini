const mongoose = require("mongoose")

const useSchema = new mongoose.Schema(
   {

      username: {
         type: String,
         required:true,
         unique:true
      },
      email: {
         type: String,
         required:true,
      },
      password: {
         type: String,
         required:true,
         minlength: 6
      },
      gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
      profilePic:{
         type: String,
         default:""
      }

   }
   , { timestamp: true }
)


module.exports = mongoose.model("User", useSchema)