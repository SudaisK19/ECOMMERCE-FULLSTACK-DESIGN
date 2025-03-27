import { NextResponse } from "next/server"; // Removed `NextRequest` since it's unused
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

// Connect to the database
connect();

export async function GET() { // Removed `request` since it's unused
  try {
    // Fetch the first user with role "admin".
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