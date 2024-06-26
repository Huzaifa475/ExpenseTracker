import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js';

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://huzaifa:POP4759H@learnmongo.bcryjbr.mongodb.net";
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
<<<<<<< HEAD
        const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
=======
        const connectionInstance = await mongoose.connect("mongodb+srv://huzaifa:POP4759H@learnmongo.bcryjbr.mongodb.net/expensetracker?retryWrites=true&w=majority&appName=LearnMongo");
>>>>>>> 795f625043dd1e85503f23506d2a6d4b52569512
        console.log(`\n MongoDB connected !! DB host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB
