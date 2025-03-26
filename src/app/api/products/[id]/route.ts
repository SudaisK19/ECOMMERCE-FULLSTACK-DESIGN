import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Products from "@/models/Products";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connect(); // Ensure database connection

  try {
    const product = await Products.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error: unknown) { // Explicitly type error
    if (error instanceof Error) {
      return NextResponse.json({ error: "Server error", details: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}


