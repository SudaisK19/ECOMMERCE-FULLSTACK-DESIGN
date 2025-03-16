import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please provide a name"] },
    email: { type: String, required: [true, "Please provide an email"], unique: true },
    password: { type: String, required: [true, "Please provide a password"] },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  { timestamps: true }
);

// Ensure the model is not recompiled on hot reloads
const Users = mongoose.models.Users || mongoose.model("Users", UserSchema);
export default Users;
