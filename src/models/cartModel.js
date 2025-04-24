import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Please provide the product ID"],
  },
  quantity: {
    type: Number,
    required: [true, "Please provide a quantity"],
    default: 1,
  },
  // Optional: You can store the price at the time of adding to the cart
  price: {
    type: Number,
  },
});

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Use the same name as your user model
      required: [true, "Please provide a user ID"],
    },
    items: {
      type: [CartItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
export default Cart;
