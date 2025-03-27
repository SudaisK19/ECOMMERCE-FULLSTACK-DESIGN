import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/productModel";
import Category from "@/models/categoryModel";

// Connect to the database immediately
connect();

/**
 * Helper function that checks if the provided category value is a valid ObjectId.
 * If not, it attempts to look up the Category document by name.
 * Returns the ObjectId (as a string) or null if not found.
 */
async function resolveCategory(categoryValue: string) {
  // 1) If it's a valid ObjectId string, return it
  if (mongoose.Types.ObjectId.isValid(categoryValue) && categoryValue.length === 24) {
    return new mongoose.Types.ObjectId(categoryValue);
  }
  // 2) Otherwise, treat it as a category name and look it up
  const categoryDoc = await Category.findOne({ name: categoryValue });
  return categoryDoc ? categoryDoc._id : null;
}

export async function GET(request: NextRequest) {
  try {
    // Populate the "category" field with only the "name" property
    const products = await Product.find({}).populate("category", "name");
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error in GET:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}




export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Convert or resolve category field
    if (body.category && typeof body.category === "string") {
      const resolved = await resolveCategory(body.category);
      if (!resolved) {
        return NextResponse.json({ error: "Category not found" }, { status: 400 });
      }
      body.category = resolved;
    }

    const product = await Product.create(body);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}


export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id, ...rest } = body;

    if (!_id) {
      return NextResponse.json({ error: "Product ID not provided" }, { status: 400 });
    }

    // Convert or resolve category field if provided
    if (rest.category && typeof rest.category === "string") {
      const resolved = await resolveCategory(rest.category);
      if (!resolved) {
        return NextResponse.json({ error: "Category not found" }, { status: 400 });
      }
      rest.category = resolved;
    }

    const product = await Product.findByIdAndUpdate(_id, rest, { new: true });
    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error in PUT:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { _id } = body;

    if (!_id) {
      return NextResponse.json({ error: "Product ID not provided" }, { status: 400 });
    }

    await Product.findByIdAndDelete(_id);
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error in DELETE:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}