// app/api/admin/order-management/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Order from "@/models/Order";

// ensure DB connection
connect();

interface Context {
  // not used here, but you could pull params for a dynamic route
  params: Record<string, string>;
}

export async function GET(request: NextRequest) {
  try {
    // fetch all orders, populate user and product info
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "name price")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    console.error("Error fetching orders:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { _id, status } = await request.json();
    if (!_id || !status) {
      return NextResponse.json(
        { success: false, error: "Order ID and new status required" },
        { status: 400 }
      );
    }
    // update only the status
    const order = await Order.findByIdAndUpdate(
      _id,
      { status },
      { new: true }
    )
      .populate("userId", "name email")
      .populate("items.productId", "name price");
    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    console.error("Error updating order:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { _id } = await request.json();
    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Order ID required" },
        { status: 400 }
      );
    }
    const deleted = await Order.findByIdAndDelete(_id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Order deleted" });
  } catch (err: any) {
    console.error("Error deleting order:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
