import axios from "axios";
import Usage from "../models/usage.model.js";

export const handleGetUsage = async (req, res) => {
  try {
    const userId = req.userId;

    const usage = await Usage.findOne({ userId });
    if (!usage) {
      return res.status(404).json({ success: false, error: "Usage not found" });
    }
    return res.status(200).json({ success: true, data: usage });
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

export const handleGetData = async (req, res) => {
  try {
    const response = await axios.get(process.env.API_URL);
    const joke = response.data.joke || response.data.setup +" \n" + response.data.delivery
    
    const {usage} = req;
    const { userId } = req;
    
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    
    if (usage) {
      await Usage.updateOne(
        { userId: userId },
        { $inc: { count: 1 } },
      );
    } else {
      await Usage.create({
        userId: userId,
        date: startOfDay,
        count: 1,
      });
    }

    return res.status(200).json({ success: true,joke });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
