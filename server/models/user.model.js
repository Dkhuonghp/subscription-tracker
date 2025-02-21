import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'User Password is required'],
        minLength: 6,
    },
    role: { type: String, default: "user" },
},{timestamps: true})

const User = mongoose.model('User', UserSchema);

export default User