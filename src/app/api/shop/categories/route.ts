import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Category from "@/models/Categories";

// Connect to the database immediately
connect();

export async function GET(request: NextRequest) {
  try {
    // Fetch all categories
    const categories = await Category.find({});
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}