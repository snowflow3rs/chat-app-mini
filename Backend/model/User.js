const mongoose = require("mongoose")

const useSchema ={

     username:{
        type:string
     },

}

module.exports= mongoose.model("User",useSchema)