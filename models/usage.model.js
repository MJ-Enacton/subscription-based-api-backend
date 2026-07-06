import mongoose from "mongoose";

const UsageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true },
    count: { type: Number, default: 1 },
  },
  { timestamps: true },
);

const Usage = mongoose.model("Usage", UsageSchema);
export default Usage;
