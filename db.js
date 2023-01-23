const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const { Schema } = mongoose;
module.exports.connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connect: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
        
    }

const postWrite = new Schema({
    title: String,
    content: String
    
}); 
module.exports.postWrite = mongoose.model("postlist",postWrite);
