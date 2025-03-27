// app/api/admin/info/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

// Connect to the database
connect();

export async function GET(request: NextRequest) {
  try {
    // For demonstration, we fetch the first user with role "admin".
    // In a real app, you might extract the admin's id from the session.
    const adminUser = await User.findOne({ role: "admin" }).select("name email _id");
    if (!adminUser) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }
    return NextResponse.json({ admin: adminUser });
  } catch (error) {
    console.error("Error fetching admin info:", error);
    return NextResponse.json({ error: "Failed to fetch admin info" }, { status: 500 });
  }
}
