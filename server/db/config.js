import mongoose from "mongoose";
import color from "colors";

const DB_NAME = process.env.DB_NAME;
const DEFAULT_DB_NAME = "test";

const connectDB = async () => {
    try {
        const dbName = DB_NAME || DEFAULT_DB_NAME;
        const mongoURI = process.env.MONGO_URI;
        // console.log("Loaded URI:", mongoURI);

        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }

        const connectionInstance = await mongoose.connect(`${mongoURI}/${dbName}`);
        console.log(`\nMongoDB connected successfully!!\nDB HOST: ${connectionInstance.connection.host}`.cyan.bold);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB