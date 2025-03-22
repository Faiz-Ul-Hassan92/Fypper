import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  profileImage: { type: String }, // URL to the image
  degreeProgram: { type: String, required: true },
  currentSemester: { type: Number, required: true },
  fypInterests: { type: [String] }, // Array of interests
  skills: { type: [String] },
  electivesTaken: { type: [String] },
  projects: [
    {
      title: { type: String, required: true },
      description: { type: String },
      technologies: { type: [String] },
      link: { type: String }
    }
  ],
  internships: [
    {
      company: { type: String, required: true },
      role: { type: String },
      duration: { type: String },
      description: { type: String }
    }
  ],
  competitions: [
    {
      name: { type: String },
      position: { type: String },
      year: { type: Number }
    }
  ],
  preferredDomains: { type: [String] },
  preferredSupervisors: { type: [String] },
  portfolioLink: { type: String }
});

export default mongoose.model("Student", studentSchema);
