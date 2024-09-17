import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateJwtToken from "../utils/generateToken.js";
//@desc Auth user & get token
//@route POST /api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateJwtToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
//@desc register user
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create a new user
  const user = await User.create({
    name,
    email,
    password, //hashed in user model
  });

  if (user) {
    generateJwtToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc logout user /clear cookie
//@route POST /api/users/logout
//@access private
const logoutUser = asyncHandler(async (req, res) => {
  // Clear the JWT token cookie by setting an expired token
  res.cookie("jwt", "", {
    expires: new Date(0), // Set expiration date in the past
    httpOnly: true, // Make the cookie HTTP-only
    secure: process.env.NODE_ENV === "production", // Set 'secure' to true in production
  });

  res.status(200).json({ message: "Logged out successfully" });
});

//@desc Get User profile
//@route GET /api/users/profile
//@access public
const getUserProfile = asyncHandler(async (req, res) => {
  // Fetch the user's profile from the database based on the user ID stored in req.user
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
//@desc Update User profile
//@route PUT /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // Update password only if provided
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Get users
//@route GET /api/users
//@access private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});
//@desc Get single user by id
//@route GET /api/users/:id
//@access private/Admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});
//@desc update user
//@route PUT /api/users/:id
//@access private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

//@desc delete user
//@route DELETE /api/users/:id
//@access private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  updateUser,
  getUserById,
  deleteUser,
};
