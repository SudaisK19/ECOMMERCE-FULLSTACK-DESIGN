// app/api/shop/review/[productID]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Review from "@/models/reviewModel";

connect();

interface Context {
  // Next will actually give you params as a Promise
  params: Promise<{ productID: string }>;
}

export async function GET(
  request: NextRequest,
  context: Context
) {
  try {
    // await the promise before destructuring
    const { productID } = await context.params;

    const reviews = await Review.find({ product: productID })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    const count = reviews.length;
    const avgRating = count
      ? Number(
          (reviews.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1)
        )
      : 0;

    return NextResponse.json({ success: true, count, avgRating, reviews });
  } catch (err: any) {
    console.error("Error fetching reviews:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: Context
) {
  try {
    const { productID } = await context.params;
    const { userId, rating, reviewText } = await request.json();

    if (!userId || rating == null || !reviewText) {
      return NextResponse.json(
        { success: false, error: "Missing userId, rating, or reviewText" },
        { status: 400 }
      );
    }

    const review = await Review.create({
      product: productID,
      user: userId,
      rating,
      reviewText,
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (err: any) {
    console.error("Error adding review:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
