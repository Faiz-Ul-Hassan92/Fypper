import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["student", "supervisor", "recruiter"], default: "student" },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
