import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Wishlist from "@/models/Wishlist";
import Product from "@/models/productModel";

connect();

// GET /api/shop/wishlist/[userID]
export async function GET(request: NextRequest) {
  try {
    const pathSegments = request.nextUrl.pathname.split("/");
    const userID = pathSegments[pathSegments.length - 1];

    const wishlist = await Wishlist.findOne({ userId: userID }).populate({
      path: "items.productId",
      select: "name price stock images",
    });

    if (!wishlist) {
      return NextResponse.json({ wishlist: null }, { status: 404 });
    }

    return NextResponse.json({ wishlist });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json({ error: "Failed to get wishlist" }, { status: 500 });
  }
}

// PUT /api/shop/wishlist/[userID]
export async function PUT(request: NextRequest) {
  try {
    const pathSegments = request.nextUrl.pathname.split("/");
    const userID = pathSegments[pathSegments.length - 1];

    const body = await request.json();
    const { items } = body;

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Items must be an array" }, { status: 400 });
    }

    let wishlist = await Wishlist.findOne({ userId: userID });
    if (!wishlist) {
      wishlist = new Wishlist({ userId: userID, items });
    } else {
      wishlist.items = items;
    }
    await wishlist.save();

    const populatedWishlist = await Wishlist.findOne({ userId: userID }).populate({
      path: "items.productId",
      select: "name price stock images",
    });

    return NextResponse.json({ wishlist: populatedWishlist });
  } catch (error) {
    console.error("Error updating wishlist:", error);
    return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 });
  }
}

// POST /api/shop/wishlist/[userID]
export async function POST(request: NextRequest) {
  try {
    const pathSegments = request.nextUrl.pathname.split("/");
    const userID = pathSegments[pathSegments.length - 1];
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: "Missing productId" }, { status: 400 });
    }

    let wishlist = await Wishlist.findOne({ userId: userID });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: userID, items: [{ productId }] });
    } else {
      // Avoid duplicates
      const alreadyExists = wishlist.items.some(
        (item: any) => item.productId.toString() === productId
      );
      if (!alreadyExists) {
        wishlist.items.push({ productId });
      }
    }

    await wishlist.save();

    const populatedWishlist = await Wishlist.findOne({ userId: userID }).populate({
      path: "items.productId",
      select: "name price stock images",
    });

    return NextResponse.json({ wishlist: populatedWishlist });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 });
  }
}

// DELETE /api/shop/wishlist/[userID]?itemId=xxx
export async function DELETE(request: NextRequest) {
  try {
    const pathSegments = request.nextUrl.pathname.split("/");
    const userID = pathSegments[pathSegments.length - 1];

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    const wishlist = await Wishlist.findOne({ userId: userID });
    if (!wishlist) {
      return NextResponse.json({ error: "Wishlist not found" }, { status: 404 });
    }

    if (productId) {
      const originalLength = wishlist.items.length;

      // Remove by matching either wishlist item ID or the productId inside the item
      wishlist.items = wishlist.items.filter(
        (item: any) =>
          item._id.toString() !== productId &&
          item.productId.toString() !== productId
      );

      if (wishlist.items.length === originalLength) {
        return NextResponse.json({ error: "Product not found in wishlist" }, { status: 404 });
      }

      await wishlist.save();

      const populatedWishlist = await Wishlist.findOne({ userId: userID }).populate({
        path: "items.productId",
        select: "name price stock images",
      });

      return NextResponse.json({ wishlist: populatedWishlist });
    } else {
      await Wishlist.deleteOne({ userId: userID });
      return NextResponse.json({ message: "Wishlist removed successfully" });
    }
  } catch (error) {
    console.error("Error deleting wishlist/item:", error);
    return NextResponse.json({ error: "Failed to delete wishlist/item" }, { status: 500 });
  }
}