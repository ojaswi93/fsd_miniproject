const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  companyName: String,
  location: String,
  username: String,
  email: String,
  password: String,
  websiteLink: { type: String, default: "" },
  gstNumber: { type: String, default: "" },
  about: { type: String, default: "" },
  profilePhoto: { type: String, default: "" }, // New field for profile photo
});

const EmployerModel = mongoose.model("employers", CompanySchema);
module.exports = EmployerModel;