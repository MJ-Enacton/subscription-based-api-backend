import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  plan_name: {
    type : String,
    required : true,
    enum: ["free", "pro", "enterprise"],
  },
  plan_limit: {
    type : Number,
    enum : [5, 50 , 500],
    required : true,
  },
});

const Plan = mongoose.model("Plan",planSchema);
export default Plan;