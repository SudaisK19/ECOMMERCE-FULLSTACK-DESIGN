import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import Product from "@/models/Products";
import { ObjectId } from 'mongodb'; 

// Connect to the database
connect();

// Define types for CartItem and the reduce sum
interface CartItem {
  productId: { _id: string; price: number };
  quantity: number;
}

// Create the POST handler for order creation
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { userId, shippingAddress } = await req.json();

    // Ensure both userId and shippingAddress are provided
    if (!userId || !shippingAddress) {
      return NextResponse.json({ error: "Missing userId or shippingAddress" }, { status: 400 });
    }

    // Handle ObjectId conversion if necessary
    let userObjectId = userId;
    // Convert to ObjectId if userId is a valid ObjectId string
    try {
      userObjectId = new ObjectId(userId);
    } catch (err) {
      // If userId is a regular string (e.g., "user123"), proceed without conversion
      console.log("User ID is not an ObjectId, using as string:", userId);
    }

    // Fetch the user's cart using userId (either as ObjectId or string)
    const cart = await Cart.findOne({ userId: userObjectId }).populate("items.productId");

    // Check if the cart is empty or not found
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty or not found" }, { status: 400 });
    }

    // Create order items by extracting product information from the cart
    const orderItems = cart.items.map((item: CartItem) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    // Calculate the total amount for the order (including adjustments)
    const totalAmount = cart.items.reduce((sum: number, item: CartItem) => {
      const price = item.productId.price || 0;
      return sum + item.quantity * price;
    }, 0) + 14 - 60; // Hardcoded adjustments (e.g., tax and discount)

    // Create the order in the database
    const order = await Order.create({
      userId: userObjectId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      status: "pending", // Default status for new orders
    });

    // Empty the cart after order creation
    cart.items = [];
    await cart.save();

    // Return success response with the created order details
    return NextResponse.json({ message: "Order placed successfully", order });
  } catch (error) {
    // Handle errors and return appropriate response
    console.error("Error placing order:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}