import mongoose from "mongoose";


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


const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;

