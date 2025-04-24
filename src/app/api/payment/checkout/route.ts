// api/payment/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connect } from "@/dbConfig/dbConfig"; // Your DB connection function
import Order from "@/models/Order"; // Your Order model
import mongoose from "mongoose";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil", // Stripe API version (ensure it matches the version you're using)
});

export async function POST(request: Request) {
  const body = await request.json();
  const { totalAmount, shippingAddress, userId, items } = body;

  const session = await mongoose.startSession(); // Start a transaction

  try {
    session.startTransaction(); // Start the transaction

    // Step 1: Create an order (with status "pending")
    const order = new Order({
      userId,
      items,
      totalAmount,
      shippingAddress,
      status: "pending",
      paymentStatus: "pending",
    });

    await order.save({ session }); // Save order inside the transaction

    // Step 2: Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Total amount in cents
      currency: "usd", // Set the currency
      metadata: { userId, shippingAddress, orderId: order._id.toString() },
    });

    // Step 3: Add the paymentIntentId to the order in DB
    order.paymentIntentId = paymentIntent.id;
    await order.save({ session }); // Save order with paymentIntentId inside the transaction

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Return the client secret to the frontend
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order._id, // Pass orderId for frontend usage
      success: true,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);

    // Abort the transaction if there was an error
    await session.abortTransaction();
    session.endSession();

    return NextResponse.json({ error: "Payment creation failed" }, { status: 500 });
  }
}
