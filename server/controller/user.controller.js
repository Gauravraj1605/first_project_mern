import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  const session = await User.startSession();

  try {
    session.startTransaction();

    const { firstName, middleName, lastName, email, mobile, password } = req.body;

    if (!firstName || !lastName || !email || !mobile || !password) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] }).session(session);

    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({ message: "Email or Mobile already in use" });
    }

    const [createdUser] = await User.create([{
      firstName,
      middleName,
      lastName,
      email,
      mobile,
      password,
    }], { session });

    const token = generateToken(createdUser._id);

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: createdUser._id,
        name: `${createdUser.firstName} ${createdUser.lastName}`,
        email: createdUser.email,
        mobile: createdUser.mobile,
        isAdmin: createdUser.isAdmin,
        isVerified: createdUser.isVerified,
      },
      token
    });

  } catch (error) {
    console.error("Register Error:", error);

    try {
      await session.abortTransaction();
    } catch (abortErr) {
      console.error("Abort Transaction Error:", abortErr);
    }

    session.endSession();

    return res.status(500).json({
      message: "Something went wrong. Please try again after 5 minutes."
    });
  }
};



// @desc    Login user
// @route   POST /api/auth/login
// @access  Public

export const loginUser = async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;

    if (!emailOrMobile || !password) {
      return res.status(400).json({ message: "Email or mobile and password are required" });
    }

    const user = await User.findOne({
      $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
    });

    if (!user || user.pendingCleanup) {
      return res.status(401).json({
        message: user?.pendingCleanup
          ? "Account is under temporary review. Try again after 5 minutes."
          : "Invalid credentials",
      });
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    // Set JWT token in cookie
    res.cookie("token", token, {
      httpOnly: true,          // inaccessible to JS (XSS protection)
      secure: process.env.NODE_ENV === "production", // only over HTTPS in prod
      sameSite: "Strict",      // prevents CSRF in most cases
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        mobile: user.mobile,
        isAdmin: user.isAdmin,
        isVerified: user.isVerified,
      },
    });

  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
};

