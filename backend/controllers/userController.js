const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Helper function to set token cookie
const setTokenCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Enhanced password validation
    validatePassword(password);

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if (user) {
        const token = generateToken(user._id);
        setTokenCookie(res, token);
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: token
        });
        console.log(user);
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    //check if user exists
    const user = await User.findOne({email});   
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id);
        setTokenCookie(res, token);
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: token
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc Logout user
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async(req, res) => {
    // Clear the token cookie
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        expires: new Date(0)
    })
    
    // The client should remove the token from storage
    res.json({ message: "Logged out successfully" });
});

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"});
};

// Enhanced password validation
const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (password.length < minLength) {
        throw new Error("Password must be at least 8 characters long");
    }
    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
        throw new Error("Password must contain uppercase, lowercase, number, and special character");
    }
};

module.exports = { registerUser, loginUser, getUserProfile, logoutUser };