// src/dbConfig/dbConfig.ts
import mongoose from "mongoose";

let isConnected = false; // track the connection status

export async function connect() {
  // If already connected, just return
  if (isConnected) return;

  // If mongoose is already connected, set the flag
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
