const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  companyName: String,
  location: String,
  username: String,
  email: String,
  password: String,
});

const EmployerModel = mongoose.model("employers", CompanySchema);
module.exports = EmployerModel;
