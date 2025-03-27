import { NextResponse } from "next/server";
import Product from "@/models/productModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(
  req: Request,
  { params }: { params: { id: string } } // Correct way to extract params in App Router API routes
) {
  try {
    await connect();

    if (!params || !params.id) {
      return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
    }

    // Fetch product by ID
    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    // Convert stock from number to boolean
    const formattedProduct = {
      ...product.toObject(),
      inStock: product.stock > 0, // true if stock > 0, false if stock == 0
      description: product.description, // Ensure description is included
    };

    return NextResponse.json({ success: true, product: formattedProduct }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ success: false, message: "Error fetching product" }, { status: 500 });
  }
}