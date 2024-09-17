import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if the cookie contains a JWT token
  if (req.cookies && req.cookies.jwt) {
    try {
      // Retrieve the token from the cookie
      token = req.cookies.jwt;

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user associated with the decoded token
      req.user = await User.findById(decoded.userId).select("-password");

      next(); // Move to the next middleware
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    // If no token is found
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Middleware to check if user is an admin
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // User is an admin, proceed to the next middleware
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});

export { protect, admin };
