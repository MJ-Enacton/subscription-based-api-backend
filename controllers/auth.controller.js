import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Plan from "../models/plan.model.js";

export const handleRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let { plan } = req.body;

    if (!plan) plan = "free";

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const planId = await Plan.findOne({plan_name : plan}, "_id");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      plan : planId._id.toString(),
    });
    
    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({
        success: false,
        error: error.message,
        message: "Internal Server Error",
      });
  }
};

export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({
        success: false,
        error: error.message,
        message: "Internal Server Error",
      });
  }
};

export const handleLogout = (req,res) => {
  try {
    return res.clearCookie("token").json({success:true,data:"User Logged out successfully"});
  } catch (error) {
    return res.status(500).json({success:false,error:error.message,message:"Internal server error"})
  }
}