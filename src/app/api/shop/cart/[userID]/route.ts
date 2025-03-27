import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/Cart";
import mongoose from "mongoose"; // Import mongoose for ObjectId type

connect();

// Define a type for cart items
interface CartItem {
  _id: mongoose.Types.ObjectId;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userID: string } }
) {
  try {
    const { userID } = params;
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("itemId");

    const cart = await Cart.findOne({ userId: userID });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    if (itemId) {
      cart.items = cart.items.filter(
        (item: CartItem) => item._id.toString() !== itemId
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
