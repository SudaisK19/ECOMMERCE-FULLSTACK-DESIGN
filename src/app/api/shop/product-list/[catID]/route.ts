import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";

// Connect to the database immediately
connect();
export async function GET(
    request: NextRequest,
    { params }: { params: { catID: string } }
  ) {
    try {
      // Destructure the catID directly without await
      const { catID } = params;
      const products = await Product.find({ category: catID }).select(
        "name price description"
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
  