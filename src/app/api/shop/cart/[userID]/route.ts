import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";

connect();

// GET /api/shop/cart/[userID]
export async function GET(
  request: NextRequest,
  { params }: { params: { userID: string } }
) {
  try {
    const { userID } = params;

    // Fetch the cart by userId and populate the product data
    const cart = await Cart.findOne({ userId: userID }).populate({
      path: "items.productId",
      select: "name price stock images"
    });

    if (!cart) {
      return NextResponse.json({ cart: null }, { status: 404 });
    }

    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Failed to get cart" }, { status: 500 });
  }
}

// PUT /api/shop/cart/[userID]
export async function PUT(
    request: NextRequest,
    { params }: { params: { userID: string } }
  ) {
    try {
      // Await the params object before using its properties
      const { userID } = await Promise.resolve(params); // Ensure params are resolved before accessing userID
      
      const body = await request.json();
      const { items } = body;
      
      if (!Array.isArray(items)) {
        return NextResponse.json({ error: "Items must be an array" }, { status: 400 });
      }
      
      let cart = await Cart.findOne({ userId: userID });
      if (!cart) {
        cart = new Cart({ userId: userID, items });
      } else {
        cart.items = items;
      }
      await cart.save();
  
      // Re-fetch the cart with populated product data
      const populatedCart = await Cart.findOne({ userId: userID }).populate({
        path: "items.productId",
        select: "name price stock images"
      });
  
      return NextResponse.json({ cart: populatedCart });
    } catch (error) {
      console.error("Error updating cart:", error);
      return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
    }
  }
  
  // DELETE /api/shop/cart/[userID]?itemId=xxx
  export async function DELETE(
    request: NextRequest,
    { params }: { params: { userID: string } }
  ) {
    try {
      const { userID } = await Promise.resolve(params); // Ensure params are resolved before accessing userID
      const { searchParams } = new URL(request.url);
      const itemId = searchParams.get("itemId");
      
      const cart = await Cart.findOne({ userId: userID });
      if (!cart) {
        return NextResponse.json({ error: "Cart not found" }, { status: 404 });
      }
  
      if (itemId) {
        cart.items = cart.items.filter(
          (item: any) => item._id.toString() !== itemId
        );
        await cart.save();
  
        // Re-fetch with population
        const populatedCart = await Cart.findOne({ userId: userID }).populate({
          path: "items.productId",
          select: "name price stock images"
        });
  
        return NextResponse.json({ cart: populatedCart });
      } else {
        await Cart.deleteOne({ userId: userID });
        return NextResponse.json({ message: "Cart removed successfully" });
      }
    } catch (error) {
      console.error("Error deleting cart/item:", error);
      return NextResponse.json({ error: "Failed to delete cart/item" }, { status: 500 });
    }
  }
