import mongoose from 'mongoose';

const WishlistItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

const WishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  items: [WishlistItemSchema],
});

export default mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);