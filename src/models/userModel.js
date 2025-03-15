import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema ({
    name:{type:String,required:[true,"please provide a name"]},
    email:{type:String,required:[true,"please provide a email"] },
    password:{type:String,required:[true,"please provide a password"]},
    role: {type: String,enum: ["admin", "customer"],default: "customer",},
    address:{type: String,default: "",},
    phone: {type: String,default: "",},
},
    { timestamps: true }
);


const Usernew = mongoose.models.Usernew || mongoose.model("Usernew", UserSchema);
export default Usernew;

