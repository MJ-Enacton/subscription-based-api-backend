import User from "../models/user.model.js";
import Usage from "../models/usage.model.js";
import Plan from "../models/plan.model.js"

const hasLimit = async (req, res, next) => {
  try {
    const userId = req.userId;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const onePlan = await Plan.findById(user.plan);
    const limit = onePlan.plan_limit;
    
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));

    const usage = await Usage.findOne({
      userId,
      date: startOfDay,
    });

    if(onePlan.plan_name === "enterprise"){
        next()
    }
    
    if (onePlan.plan_name === "free") {
      if (usage && usage.count >= limit) {
        return res.status(403).json({
          success: false,
          error: "Daily limit reached for free plan",
        });
      }
    } else if (onePlan.plan_name === "pro") {
      if (usage && usage.count >= limit) {
        return res.status(403).json({
          success: false,
          error: "Daily limit reached for pro plan",
        });
      }
    }

    req.usage=usage;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export default hasLimit;