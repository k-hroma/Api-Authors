import { connect, ConnectOptions } from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

type ConnectionResult = {
  success: boolean;
  message: string;
};

const connectMongoDB = async ():Promise<ConnectionResult> => {
  const URI_DB = process.env.URI_DB?.trim();
  if (!URI_DB) {
    const errorMsg = "MongoDB connection string missing or empty";
    console.error(errorMsg);
    return {
      success: false,
      message: errorMsg
    };
  }

  try {
    const options: ConnectOptions = {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true, 
      maxPoolSize: 10 
    };

    await connect(URI_DB, options)
    return {
      success: true,
      message:"Successful connection"
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown database connection error";
    console.error(`MongoDB connection failed:${errorMessage}`)
    return {
      success: false,
      message:`Connection failed: ${errorMessage}`
    }
  }
}

export {connectMongoDB }