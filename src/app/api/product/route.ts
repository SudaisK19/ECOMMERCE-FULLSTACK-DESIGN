import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await connect(); // Connect to MongoDB
  const products = await Product.find(); // Fetch products
  return NextResponse.json(products);
}
