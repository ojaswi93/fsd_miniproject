// models/JobApplication.js
const mongoose = require("mongoose");

const JobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job_posts",
    required: true,
  },
  username: { type: String, required: true }, // Worker username
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employers",
    required: true,
  }, 
  companyUsername: { type: String, required: true }, 
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  appliedDate: { type: Date, default: Date.now },
});

const JobApplicationModel = mongoose.model("job_applications", JobApplicationSchema);
module.exports = JobApplicationModel;
