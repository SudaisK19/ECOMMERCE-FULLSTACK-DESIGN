import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const reviewSchema = new Schema(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String, required: true, trim: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: false }
  }
);

// This makes sure we don’t redefine the model on every file import
export default models.Review || model('Review', reviewSchema);