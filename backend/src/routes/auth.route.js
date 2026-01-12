import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import authMiddleware from "../middleware/auth.middleware.js";


const router = Router();

/**
 * =========================
 * SIGNUP ROUTE
 * POST /api/auth/signup
 * =========================
 */
router.post("/signup", async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase();
    const password = req.body.password;

    // 1. Basic validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    await User.create({
      email,
      password: hashedPassword,
    });

    // 5. Success response
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

/**
 * =========================
 * LOGIN ROUTE
 * POST /api/auth/login
 * =========================
 */
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase();
    const password = req.body.password;

    // 1. Basic validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 4. Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // 5. Success response
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

/**
 * =========================
 * GET CURRENT USER
 * GET /api/auth/me
 * =========================
 */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    res.status(200).json({
      message: "Protected route accessed",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});


export default router;
