import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connect } from "@/dbConfig/dbConfig"; // Your DB connection function
import Order from "@/models/Order"; // Your Order model
import Product from "@/models/productModel"; // Your Product model
import mongoose from "mongoose";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil", // Stripe API version (ensure it matches the version you're using)
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature")!;
  const body = await request.text();

  const session = await mongoose.startSession(); // Start a transaction

  try {
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object; // PaymentIntent object
        console.log(`PaymentIntent for ${paymentIntent.amount_received} was successful.`);

        // Start the transaction
        session.startTransaction();

        // Find the order by paymentIntentId
        const order = await Order.findOne({ paymentIntentId: paymentIntent.id }).session(session);

        if (order) {
          // Update order status to "paid"
          order.paymentStatus = "paid";
          order.status = "confirmed"; // Change status based on your requirement
          await order.save({ session }); // Save order with updated status

          // Decrease stock for each ordered product
          for (const item of order.items) {
            const product = await Product.findById(item.productId).session(session);
            if (product) {
              if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await product.save({ session }); // Save updated product stock
              } else {
                console.error(`Insufficient stock for product ${product._id}.`);
                throw new Error(`Insufficient stock for product ${product._id}`);
              }
            } else {
              console.error(`Product ${item.productId} not found.`);
              throw new Error(`Product ${item.productId} not found.`);
            }
          }
        } else {
          console.error("Order not found for PaymentIntent ID:", paymentIntent.id);
          throw new Error("Order not found");
        }

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
        break;

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object;
       // console.log(`PaymentIntent failed: ${failedPayment.error.message}`);

        // Handle failed payment here (e.g., update the order status to 'failed')
        const failedOrder = await Order.findOne({ paymentIntentId: failedPayment.id });
        if (failedOrder) {
          failedOrder.paymentStatus = "failed";
          await failedOrder.save();
        } else {
          console.error("Failed order not found.");
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);

    // Abort the transaction if there was an error
    await session.abortTransaction();
    session.endSession();

    return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 });
  }
}
