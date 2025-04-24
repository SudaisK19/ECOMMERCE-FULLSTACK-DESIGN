import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/Users";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    // Establish DB connection here instead of at the top level
    await connect();

    const { email, password } = await request.json();

    // Find user by email and include password in the result
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validate password (mocked here, normally you'd hash compare)
    if (password !== user.password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const responseData = {
      message: "Login successful",
      success: true,
      user: {
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      },
    };

    const response = NextResponse.json(responseData, { status: 200 });

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
    if (error instanceof Error) {
      console.error("Error in login route:", error.message);
      return NextResponse.json(
        { error: "Internal Server Error", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error occurred:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
