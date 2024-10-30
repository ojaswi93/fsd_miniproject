// Other imports and middleware...
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const EmployerModel = require("./models/Company");
const JobModel = require("./models/Job");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/employee")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Register Worker
app.post("/registerworker", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employees) => {
      console.log("Document saved in MongoDB:", employees);
      res.json(employees);
    })
    .catch((err) => {
      console.log("Error while saving to MongoDB:", err);
      res
        .status(500)
        .json({ message: "Failed to save to database", error: err });
    });
});

// Register Company
app.post("/registercompany", (req, res) => {
  EmployerModel.create(req.body)
    .then((companys) => {
      console.log("Document saved in MongoDB:", companys);
      res.json(companys);
    })
    .catch((err) => {
      console.log("Error while saving to MongoDB:", err);
      res
        .status(500)
        .json({ message: "Failed to save to database", error: err });
    });
});

// Login Endpoint
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // First, check EmployeeModel
    const user = await EmployeeModel.findOne({ username: username });

    if (user) {
      if (user.password === password) {
        return res.json({ role: "employee" });
      } else {
        return res.status(400).json({ message: "The password is incorrect" });
      }
    }

    // If not found in EmployeeModel, check EmployerModel
    const employer = await EmployerModel.findOne({ username: username });

    if (employer) {
      if (employer.password === password) {
        return res.json({ role: "employer" });
      } else {
        return res.status(400).json({ message: "The password is incorrect" });
      }
    }

    // If not found in either model
    res.status(404).json({ message: "No record exists" });
  } catch (err) {
    console.log("Error during login:", err);
    res
      .status(500)
      .json({ message: "An error occurred during login", error: err });
  }
});

// Job Posting Endpoint
app.post("/postjob", async (req, res) => {
  try {
    const jobData = req.body;
    const jobPost = new JobModel(jobData);
    await jobPost.save();
    res.status(201).json({ message: "Job posted successfully", jobPost });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ message: "Failed to post job", error });
  }
});

// Get All Jobs Endpoint
// index.js (Backend)
app.get("/getAllJobs", async (_req, res) => {
  try {
    const jobs = await JobModel.find();
    const transformedJobs = jobs.map((job) => ({
      _id: job._id,
      title: job.jobTitle, // Change 'jobTitle' to 'title'
      location: job.location,
      salary: job.salary,
      duration: job.duration,
    }));
    console.log("Transformed jobs:", transformedJobs);
    res.json(transformedJobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Error fetching jobs", error });
  }
});

// Add this in your index.js
app.get("/getJobDetails/:jobId", async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await JobModel.findById(jobId).populate("companyId"); // Populate to get company details
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ message: "Error fetching job details", error });
  }
});

// Get User Details
app.get("/getUserDetails/:username", (req, res) => {
  const { username } = req.params;

  EmployeeModel.findOne({ username: username })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      console.error("Error fetching user details:", err);
      res
        .status(500)
        .json({ message: "Error fetching user details", error: err });
    });
});

// Update User Details
app.put("/updateUser/:username", async (req, res) => {
  const { username } = req.params;
  const updatedData = req.body;

  try {
    const user = await EmployeeModel.findOneAndUpdate(
      { username: username },
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (user) {
      res.json({ message: "User details updated successfully", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Error updating user details", error });
  }
});

// Fetch Company Details
app.get("/getCompanyDetails/:username", (req, res) => {
  const { username } = req.params;

  EmployerModel.findOne({ username: username })
    .then((company) => {
      if (company) {
        res.json(company);
      } else {
        res.status(404).json({ message: "Company not found" });
      }
    })
    .catch((err) => {
      console.error("Error fetching company details:", err);
      res
        .status(500)
        .json({ message: "Error fetching company details", error: err });
    });
});

// Update Company Details
app.put("/updateCompany/:username", async (req, res) => {
  const { username } = req.params;
  const updatedData = req.body;

  try {
    const company = await EmployerModel.findOneAndUpdate(
      { username: username },
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (company) {
      res.json({ message: "Company details updated successfully", company });
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    console.error("Error updating company details:", error);
    res.status(500).json({ message: "Error updating company details", error });
  }
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
