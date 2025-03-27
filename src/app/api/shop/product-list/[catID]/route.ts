import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/Products";

// Ensure database connection
connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { catID: string } }
) {
  try {
    const { catID } = params;

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
