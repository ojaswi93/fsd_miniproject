// Other imports and middleware...
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const EmployeeModel = require("./models/Employee");
const EmployerModel = require("./models/Company");
const JobModel = require("./models/Job");
const JobApplicationModel = require("./models/Application");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose
  .connect("mongodb://localhost:27017/employee")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure the 'uploads' folder exists or create it
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

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
    // Populate 'companyId' and only select 'profilePhoto'
    const jobs = await JobModel.find().populate("companyId", "profilePhoto");
    
    const transformedJobs = jobs.map((job) => ({
      _id: job._id,
      title: job.jobTitle,
      location: job.location,
      salary: job.salary,
      duration: job.duration,
      profilePhoto: job.companyId?.profilePhoto || "", // Safely access the profile photo
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
    const applications = await JobApplicationModel.find({ username });
    const jobIds = applications.map((application) => application.jobId);

    const jobs = await JobModel.find({ _id: { $in: jobIds } }).populate(
      "companyId",
      "profilePhoto"
    );

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
        profilePhoto: job.companyId ? job.companyId.profilePhoto : null,
        status: application ? application.status : "Applied",
      };
    });

    console.log("Job details with profile photos:", jobDetails); // Add this line for debugging
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
app.put("/updateUser/:username", upload.single("profilePhoto"), async (req, res) => {
  try {
    const username = req.params.username;
    const updateData = { ...req.body };

    if (req.file) {
      updateData.profilePhoto = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await EmployeeModel.findOneAndUpdate(
      { username: username }, // Match by username field
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User profile updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Failed to update user profile", error: error.message });
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

// Endpoint to update company details with profile photo
app.put("/updatecompany/:username", upload.single("profilePhoto"), async (req, res) => {
  try {
    const username = req.params.username;
    const updateData = { ...req.body };

    console.log("Incoming request body:", updateData);
    console.log("Incoming file data:", req.file);

    // Check if a file was uploaded and add its path to update data
    if (req.file) {
      updateData.profilePhoto = `/uploads/${req.file.filename}`;
    }

    // Use `username` as the filter instead of `_id`
    const updatedCompany = await EmployerModel.findOneAndUpdate(
      { username: username }, // Ensure this matches the database field for username
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company details updated successfully", updatedCompany });
  } catch (error) {
    console.error("Error updating company details:", error);
    res.status(500).json({ message: "Failed to update company details", error: error.message });
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

    // Find the job to get the company ID and username
    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    const companyId = job.companyId; // Get companyId from the job
    const companyUsername = job.username; // Get company username from the job

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
      companyUsername, // Include companyUsername
      status: "pending",
    });
    await application.save();
    res.status(201).json({
      message: "Application submitted successfully",
      application: { ...application.toObject(), status: "pending" },
    });
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

// Get all job applications for a company based on the company username
app.get("/getApplicationsByCompany/:companyUsername", async (req, res) => {
  const { companyUsername } = req.params;

  try {
    // Fetch all applications for the company using the username
    const applications = await JobApplicationModel.find({ companyUsername });

    // If no applications are found
    if (!applications.length) {
      return res.status(404).json({ message: "No applications found for this company." });
    }

    // Extract usernames from applications to fetch worker profiles
    const usernames = applications.map(application => application.username);

    // Fetch worker details (including profile photos) based on usernames
    const workers = await EmployeeModel.find({ username: { $in: usernames } });

    // Create a map of usernames to their profile photos for quick lookup
    const workerProfilePhotos = workers.reduce((acc, worker) => {
      acc[worker.username] = worker.profilePhoto; // Assuming profilePhoto is in EmployeeModel
      return acc;
    }, {});

    // Map through the applications to combine application details with worker profile photos
    const applicationsWithJobDetails = applications.map(application => {
      return {
        _id: application._id,
        username: application.username,
        jobId: application.jobId,
        jobTitle: application.jobTitle, // Assuming this is available in the application
        workerProfilePhoto: workerProfilePhotos[application.username] || null,
        status: application.status,
        appliedDate: application.appliedDate,
      };
    });

    // Return the applications with job details
    res.json(applicationsWithJobDetails);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Error fetching applications", error });
  }
});

// Update Application Status
app.put("/updateApplicationStatus/:applicationId", async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  try {
    const application = await JobApplicationModel.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true, runValidators: true }
    );

    if (application) {
      res.json({
        message: "Application status updated successfully",
        application,
      });
    } else {
      res.status(404).json({ message: "Application not found" });
    }
  } catch (error) {
    console.error("Error updating application status:", error);
    res
      .status(500)
      .json({ message: "Error updating application status", error });
  }
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
