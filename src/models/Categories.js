import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a category name"],
    },
    description: {
      type: String,
      required: [true, "Please provide a category description"],
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      default: null, // For subcategories; null if no parent exists
    },
  },
  { timestamps: true }
);

const Categories = mongoose.models.Categories || mongoose.model("Categories", CategorySchema);
export default Categories;