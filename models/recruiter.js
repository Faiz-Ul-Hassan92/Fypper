import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyWebsite: { type: String, match: [/^https?:\/\/.+/, "Invalid URL"] },
  jobTitle: { type: String, required: true },
  companyAddress: { type: String, required: true },
  companyDescription: { type: String },
  fieldsOfInterest: { type: [String], required: true },
  linkedinProfile: { type: String, match: [/^https?:\/\/(www\.)?linkedin\.com\/.+/, "Invalid LinkedIn URL"] },
  picture: { type: String }, // URL to profile picture or logo
}, { timestamps: true });

export default mongoose.model("Recruiter", recruiterSchema);
