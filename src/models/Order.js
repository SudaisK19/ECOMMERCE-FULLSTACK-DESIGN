// models/Order.js
import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["pending", "shipped", "delivered", "cancelled"], 
      default: "pending" 
    },
    // Payment details
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentIntentId: { type: String }, // Store the payment intent ID
    paymentMethod: { type: String },   // Store the payment method used (e.g., card)
    transactionId: { type: String },   // Store the Stripe transaction ID
  },
  { timestamps: true }
);


export default mongoose.models.Ordernew || mongoose.model("Ordernew", OrderSchema);