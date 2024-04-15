"use server"
import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries.
  if (!process.env.NEXT_PUBLIC_MONGODB_URL) return console.log("Missing MongoDB URL");

  // If the connection is already established, return without creating a new connection.
  if (isConnected) {
    console.log("MongoDB connection already established");
    return;
  }

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL);
    mongoose.set('strictQuery', false);

    isConnected = true; // Set the connection status to true
    console.log("MongoDB connected");
    console.log(mongoose.models);

  } catch (error) {
    console.log(error);
  }
};