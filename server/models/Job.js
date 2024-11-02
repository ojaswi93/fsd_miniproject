const mongoose = require("mongoose");

const JobPostSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  salary: { type: Number, required: true },
  description: { type: String, required: true },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employers",
    required: true,
  },
  postedDate: { type: Date, default: Date.now },
  username: { type: String, required: true },
});

const JobModel = mongoose.model("job_posts", JobPostSchema);
module.exports = JobModel;
