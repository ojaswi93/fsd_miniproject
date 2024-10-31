// Other imports and middleware...
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const EmployerModel = require("./models/Company");
const JobModel = require("./models/Job");
const JobApplicationModel = require("./models/Application"); // Import the new model

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

app.post("/postjob", async (req, res) => {
  try {
    const jobData = { ...req.body, username: req.body.username }; // Assuming username is passed in the request body
    const jobPost = new JobModel(jobData);
    await jobPost.save();
    res.status(201).json({ message: "Job posted successfully", jobPost });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ message: "Failed to post job", error });
  }
});

// Get All Jobs Endpoint
app.get("/getAllJobs", async (_req, res) => {
  try {
    const jobs = await JobModel.find();
    const transformedJobs = jobs.map((job) => ({
      _id: job._id,
      title: job.jobTitle,
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

//Get job details using job id
app.get("/getJobDetails/:jobId", async (req, res) => {
  const { jobId } = req.params;

  try {
    const job = await JobModel.findById(jobId).populate("companyId"); // Populate to get company details
    if (job) {
      console.log("Job details:", job); // Add this line to log the job details
      res.json(job);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ message: "Error fetching job details", error });
  }
});

app.get("/getAppliedJobs/:username", async (req, res) => {
  const { username } = req.params;

  try {
    // Step 1: Find job applications by username
    const applications = await JobApplicationModel.find({ username });

    // Step 2: Extract jobIds from applications
    const jobIds = applications.map((application) => application.jobId);

    // Step 3: Fetch job details for each applied job
    const jobs = await JobModel.find({ _id: { $in: jobIds } });

    // Step 4: Combine job details with application status
    const jobDetails = jobs.map((job) => {
      const application = applications.find(
        (app) => app.jobId.toString() === job._id.toString()
      );
      return {
        _id: job._id,
        title: job.jobTitle,
        location: job.location,
        salary: job.salary,
        duration: job.duration,
        status: application ? application.status : "Applied", // Default to "Applied" if no status found
      };
    });

    res.json(jobDetails);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ error: "Failed to fetch applied jobs" });
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

// Fetch Company Details using username
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

// Fetch Company Details using company id
app.get("/getCompanyDet/:companyId", async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await EmployerModel.findById(companyId);
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (err) {
    console.error("Error fetching company details:", err);
    res
      .status(500)
      .json({ message: "Error fetching company details", error: err });
  }
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

// Apply for Job Endpoint
app.post("/applyForJob", async (req, res) => {
  try {
    const { jobId, username } = req.body; // Get jobId and username from request body

    // Validate jobId and username
    if (!jobId || !username) {
      return res
        .status(400)
        .json({ message: "Job ID and username are required." });
    }

    // Find the job to get the company ID
    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    const companyId = job.companyId; // Get companyId from the job

    // Check if the application already exists
    const existingApplication = await JobApplicationModel.findOne({
      jobId,
      username,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job." });
    }

    // Create a new application
    const application = new JobApplicationModel({
      jobId,
      username,
      companyId,
      status: "pending",
    }); // Include companyId and status
    await application.save();
    res.status(201).json({
      message: "Application submitted successfully",
      application: { ...application.toObject(), status: "pending" },
    }); // Return application status
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({ message: "Failed to apply for job", error });
  }
});

//Get application status of a particular job for a particular worker
app.get("/getApplicationStatus/:jobId/:username", async (req, res) => {
  const { jobId, username } = req.params;

  try {
    const application = await JobApplicationModel.findOne({ jobId, username });

    if (application) {
      res.json({ status: application.status });
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    console.error("Error fetching application status:", error);
    res
      .status(500)
      .json({ message: "Error fetching application status", error });
  }
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
