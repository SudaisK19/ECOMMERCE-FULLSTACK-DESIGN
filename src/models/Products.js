import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Product name is required"] },
    description: { type: String, required: [true, "Description is required"] },
    price: { type: Number, required: [true, "Price is required"] },
    category: { type: String, required: [true, "Category is required"] },
    stock: { type: Number, default: 0 },
    image: { type: String, required: [true, "Image URL is required"] }, // Store image URL
  },
  { timestamps: true }
);

const Products = mongoose.models.Products || mongoose.model("Products", ProductSchema);
export default Products;
