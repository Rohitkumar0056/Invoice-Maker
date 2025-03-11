import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { generateToken } from "../config/generateToken.js";

export const registerUser = asyncHandler (async (req, res) => {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }

    const userExists = await User.findOne({ email });
    
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
    });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

export const authUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
        res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
    });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});