import { NextResponse } from "next/server";
import Product from "@/models/Products";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(req: Request) {
  try {
    await connect();

    // Extract the product ID from the URL path
    const pathSegments = req.url.split("/");
    const productId = pathSegments[pathSegments.length - 1]; // Assuming the ID is the last segment

    if (!productId) {
      return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
    }

    // Fetch product by ID
    const product = await Product.findById(productId);

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
