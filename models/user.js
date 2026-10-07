import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    Email: {
        type: String,
        required: true,
        unique: true
    },

    firstname: {
        type: String,
        required: true
    },

    Lastname: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    userType: {
        type: String,
        enum: ["admin", "customer"],
        default: "customer",
        required: true
    }
});

const User = mongoose.model("User", userSchema);

export default User;