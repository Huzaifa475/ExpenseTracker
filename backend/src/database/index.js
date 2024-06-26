import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://huzaifa:POP4759H@learnmongo.bcryjbr.mongodb.net";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB