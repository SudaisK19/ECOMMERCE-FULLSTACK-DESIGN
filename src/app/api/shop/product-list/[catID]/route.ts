import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";

// Ensure database connection
connect();

export async function GET(request: NextRequest) {
  try {
    // Extract catID from the URL path
    const pathSegments = request.nextUrl.pathname.split("/");
    const catID = pathSegments[pathSegments.length - 1]; // This assumes the catID is the last segment
    
    if (!catID) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    // Fetch products based on category
    const products = await Product.find({ category: catID }).select(
      "name price description images"
    );

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}