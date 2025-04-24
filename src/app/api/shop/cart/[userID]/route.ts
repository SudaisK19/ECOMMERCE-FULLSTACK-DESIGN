
import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Cart from "@/models/cartModel";
import Product from "@/models/productModel"; 


connect();

interface CartItem {
  _id: string;           // The unique cart item ID from MongoDB.
  productId: string;     // The product's ID (populated via server populate).
  name?: string;         // Product name.
  price?: number;        // Product price.
  stock?: number;        // Product stock.
  quantity: number;      // Quantity in the cart.
  images?: string[];     // Array of image URLs from the product.
}

// GET /api/shop/cart/[userID]
export async function GET(request: NextRequest) {
  try {
    // Extract userID from the URL path
    const pathSegments = request.nextUrl.pathname.split("/");
    const userID = pathSegments[pathSegments.length - 1];  // This assumes the userID is the last segment

    // Fetch the cart by userId and populate the product data
    const cart = await Cart.findOne({ userId: userID }).populate({
      path: "items.productId",
      select: "name price stock images"
    });

    if (!cart) {
      return NextResponse.json({ cart: null }, { status: 404 });
    }

    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Failed to get cart" }, { status: 500 });
  }
}

// PUT /api/shop/cart/[userID]
export async function PUT(request: NextRequest) {
  try {
    // Extract userID from the URL path
    const pathSegments = request.nextUrl.pathname.split("/");
    const userID = pathSegments[pathSegments.length - 1];  // This assumes the userID is the last segment
    
    const body = await request.json();
    const { items } = body;
    
    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Items must be an array" }, { status: 400 });
    }
    
    let cart = await Cart.findOne({ userId: userID });
    if (!cart) {
      cart = new Cart({ userId: userID, items });
    } else {
      cart.items = items;
    }
    await cart.save();

    // Re-fetch the cart with populated product data
    const populatedCart = await Cart.findOne({ userId: userID }).populate({
      path: "items.productId",
      select: "name price stock images"
    });

    return NextResponse.json({ cart: populatedCart });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

// DELETE /api/shop/cart/[userID]?itemId=xxx
export async function DELETE(request: NextRequest) {
  try {
    // Extract userID from the URL path
    const pathSegments = request.nextUrl.pathname.split("/");
    const userID = pathSegments[pathSegments.length - 1];  // This assumes the userID is the last segment
    
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("itemId");
    
    const cart = await Cart.findOne({ userId: userID });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    if (itemId) {
      cart.items = cart.items.filter(
        (item: CartItem) => item._id.toString() !== itemId
      );
      await cart.save();

      // Re-fetch with population
      const populatedCart = await Cart.findOne({ userId: userID }).populate({
        path: "items.productId",
        select: "name price stock images"
      });

      return NextResponse.json({ cart: populatedCart });
    } else {
      await Cart.deleteOne({ userId: userID });
      return NextResponse.json({ message: "Cart removed successfully" });
    }
  } catch (error) {
    console.error("Error deleting cart/item:", error);
    return NextResponse.json({ error: "Failed to delete cart/item" }, { status: 500 });
  }
}

// POST /api/shop/cart/[userID]
export async function POST(request: NextRequest) {
  try {
    // Extract userID from the URL path
    const pathSegments = request.nextUrl.pathname.split("/");
    const userID = pathSegments[pathSegments.length - 1];

    const body = await request.json();
    const { productId, quantity } = body;  // Getting productId and quantity from the request body

    if (!productId || !quantity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Fetch product details from the database to get price
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Get the product's price
    const price = product.price;

    let cart = await Cart.findOne({ userId: userID });
    if (!cart) {
      cart = new Cart({ userId: userID, items: [] });
    }

    // Check if the item already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (item: any) => item.productId.toString() === productId
    );

    if (existingItemIndex !== -1) {
      // If the product already exists in the cart, just update the quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // If the product doesn't exist in the cart, add a new item with price
      cart.items.push({
        productId,
        quantity,
        price, // Ensure the price is saved in the cart item
      });
    }

    await cart.save();

    // Re-fetch the cart with populated product data
    const populatedCart = await Cart.findOne({ userId: userID }).populate({
      path: "items.productId",
      select: "name price stock images"
    });

    return NextResponse.json({ cart: populatedCart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 });
  }
}