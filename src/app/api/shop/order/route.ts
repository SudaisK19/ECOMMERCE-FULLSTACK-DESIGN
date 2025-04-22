import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import Product from "@/models/Products";

connect();

// Define types for CartItem and the reduce sum
interface CartItem {
  productId: { _id: string; price: number };
  quantity: number;
}

export async function POST(req: NextRequest) {
  try {
    const { userId, shippingAddress } = await req.json();

    if (!userId || !shippingAddress) {
      return NextResponse.json({ error: "Missing userId or shippingAddress" }, { status: 400 });
    }

    // Get the user's cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty or not found" }, { status: 400 });
    }

    // Create order items and calculate total
    const orderItems = cart.items.map((item: CartItem) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    // Calculate total amount with adjustments
    const totalAmount = cart.items.reduce((sum: number, item: CartItem) => {
        const price = item.productId.price || 0;
        return sum + item.quantity * price;
    }, 0) + 14 - 60;
  

    // Create the order
    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      status: "pending", // Default status
    });

    // Empty the cart
    cart.items = [];
    await cart.save();

    return NextResponse.json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}
