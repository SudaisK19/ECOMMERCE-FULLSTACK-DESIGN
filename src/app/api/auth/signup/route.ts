import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/Users";

connect();

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, address, phone } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
    const newUser = new User({ name, email, password, address, phone });
    await newUser.save();
    return NextResponse.json({ message: "User created successfully", success: true }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error); // Log the error
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}