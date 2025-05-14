import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/Users";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const { email, password } = await request.json();

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (password !== user.password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // ← sign the token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ← include it in the JSON response
    const responseData = {
      message: "Login successful",
      success: true,
      token,       // ← new
      user: {
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      },
    };

    const response = NextResponse.json(responseData, { status: 200 });

    // you may continue to set the cookie if you like:
    response.cookies.set({
      name: "authToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error: unknown) {
    console.error("Error in login route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : undefined },
      { status: 500 }
    );
  }
}
