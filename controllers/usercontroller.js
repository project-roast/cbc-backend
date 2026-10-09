
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// CREATE USER
export async function createUser(req, res) {
    try {
        const {
            Email,
            firstname,
            Lastname,
            password,
            userType
        } = req.body;

        // Validate required fields
        if (!Email || !firstname || !Lastname || !password) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        // Only allow admin creation by an authenticated admin
        if (userType === "admin") {
            if (!req.user) {
                return res.status(401).json({
                    message: "Please login first"
                });
            }

            if (req.user.userType !== "admin") {
                return res.status(403).json({
                    message: "Only admins can create admin accounts"
                });
            }
        }

        // Public registration can only create customers
        const accountType =
            userType === "admin" ? "admin" : "customer";

        // Check duplicate email
        const existingUser = await User.findOne({ Email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            Email,
            firstname,
            Lastname,
            password: hashedPassword,
            userType: accountType
        });

        await newUser.save();

        return res.status(201).json({
            message: "User created successfully",
            userType: accountType
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "User creation failed"
        });
    }
}


// LOGIN USER
export async function loginUser(req, res) {
    try {
        const { Email, password } = req.body;

        if (!Email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ Email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        if (!process.env.SECRET) {
            return res.status(500).json({
                message: "JWT secret is not configured"
            });
        }

        const token = jwt.sign(
            {
                id: user._id.toString(),
                Email: user.Email,
                userType: user.userType
            },
            process.env.SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "User logged in successfully",
            token,
            userType: user.userType
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Login failed"
        });
    }
}


// DELETE USER — ADMIN ONLY
export async function deleteUser(req, res) {
    try {
        // Requires verified JWT middleware to set req.user
        if (!req.user) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        if (req.user.userType !== "admin") {
            return res.status(403).json({
                message: "Only admins can delete users"
            });
        }

        const { Email } = req.body;

        if (!Email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const deletedUser = await User.findOneAndDelete({ Email });

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "User deletion failed"
        });
    }
}