const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const EmployerModel = require("./models/Company");

const app = express();
app.use(express.json());
app.use(cors());
// instead of local host u may use 127.0.0.1
mongoose
  .connect("mongodb://localhost:27017/employee")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

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

app.put("/updateUser/:username", async (req, res) => {
  const { username } = req.params;
  const updatedData = req.body;

  try {
    const user = await EmployeeModel.findOneAndUpdate(
      { username: username }, // Find user by username
      { $set: updatedData }, // Update fields with new data
      { new: true, runValidators: true } // Return the updated document and validate changes
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

app.listen(3001, () => {
  console.log("Server is running");
});
