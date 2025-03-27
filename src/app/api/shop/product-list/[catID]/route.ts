import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/Products";

// Connect to the database immediately
connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { catID: string } }
) {
  try {
    const { catID } = params;

    // Fetch products and include the images array
    const products = await Product.find({ category: catID }).select(
      "name price description images"
    );

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
