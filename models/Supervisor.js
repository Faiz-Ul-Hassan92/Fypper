import mongoose from "mongoose";

const supervisorSchema = new mongoose.Schema({
  department: { type: String, required: true },
  designation: { type: String, required: true },
  researchInterests: { type: [String] },
  profileImage: { type: String }, // URL to profile image
  qualifications: { type: [String], required: true }, // e.g., PhD, MS
  specializations: { type: [String] },
  publications: [
    {
      title: { type: String, required: true },
      journal: { type: String },
      year: { type: Number },
      link: { type: String }
    }
  ],
  yearsOfExperience: { type: Number, required: true },
  officeLocation: { type: String, required: true },
  availableSlots: { type: Number, default: 0 } // slots for supervising students
});

export default mongoose.model("Supervisor", supervisorSchema);
