import mongoose, { Schema, Document } from "mongoose";

interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: { product: mongoose.Types.ObjectId; quantity: number }[];
  createdAt: Date;
}

const CartSchema = new Schema<ICart>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
