import User from "../models/User.js";
import asyncHandler from "../middleware/async.js";
import { generateToken } from "../utils/jwt.js";
import { sendEmail } from "../utils/email.js";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper to generate 6-digit code
const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Password validation
const validatePassword = (password) => {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(
    password
  );
};

// @desc Register user
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, googleToken } = req.body;

  // Google OAuth login
  if (googleToken) {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const user = await User.findOne({ email: payload.email });
    if (user) {
      return res.json({ token: generateToken(user._id, user.role) });
    }
    const newUser = await User.create({
      firstName: payload.given_name,
      lastName: payload.family_name,
      email: payload.email,
      isVerified: true,
    });
    return res.json({ token: generateToken(newUser._id, newUser.role) });
  }

  // Normal registration
  if (!validatePassword(password)) {
    res.status(400);
    throw new Error(
      "Password must have 6+ chars, 1 capital, 1 number, 1 symbol"
    );
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already registered");
  }

  const emailCode = generateCode();
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    verificationCode: emailCode,
  });
  await sendEmail(
    email,
    "Verify your email",
    `Your verification code is: ${emailCode}`
  );

  res
    .status(201)
    .json({ message: "Verification code sent to email", userId: user._id });
});

// @desc Verify email
export const verifyEmail = asyncHandler(async (req, res) => {
  const { userId, code } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Normalize code values
  const userCode = String(user.verificationCode || "").trim();
  const inputCode = String(code || "").trim();

  console.log("User code:", userCode);
  console.log("Input code:", inputCode);

  if (!userCode || userCode !== inputCode) {
    res.status(400);
    throw new Error("Invalid verification code");
  }

  user.isVerified = true;
  user.verificationCode = null;
  await user.save();

  res.json({ token: generateToken(user._id, user.role) });
});



// ---------------------- Resend Code ----------------------
export const resendVerificationCode = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("Email already verified");
  }

  const newCode = generateCode();
  user.verificationCode = newCode;
  await user.save();

  await sendEmail(
    email,
    "Resend Verification Code",
    `Your new verification code is: ${newCode}`
  );

  res.json({ message: "New verification code sent to email" });
});


// @desc Login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  if (!user.isVerified) {
    res.status(401);
    throw new Error("Email not verified");
  }

  const isMatch = user.password && (await user.matchPassword(password));
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({ token: generateToken(user._id, user.role) });
});

// @desc Forgot password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const resetCode = generateCode();
  user.resetPasswordCode = resetCode;
  await user.save();
  await sendEmail(email, "Password Reset Code", `Your code is: ${resetCode}`);
  res.json({ message: "Reset code sent to email" });
});

// @desc Reset password
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, code, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Normalize values
  const storedCode = String(user.resetPasswordCode || "").trim();
  const inputCode = String(code || "").trim();

  console.log("Stored reset code:", storedCode);
  console.log("Input reset code:", inputCode);

  if (!storedCode || storedCode !== inputCode) {
    res.status(400);
    throw new Error("Invalid code");
  }

  if (!validatePassword(newPassword)) {
    res.status(400);
    throw new Error(
      "Password must have 6+ chars, 1 capital, 1 number, 1 symbol"
    );
  }

  user.password = newPassword;
  user.resetPasswordCode = null; // ✅ clear code after reset
  await user.save();

  res.json({ message: "Password reset successfully" });
});

