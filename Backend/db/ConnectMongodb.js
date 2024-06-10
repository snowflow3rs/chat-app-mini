const mongoose = require("mongoose")
const ConnectMongodb = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

 module.exports=ConnectMongodb