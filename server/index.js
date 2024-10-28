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

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // First, check EmployeeModel
  EmployeeModel.findOne({ username: username })
    .then((user) => {
      if (user) {
        // Password match for employee
        if (user.password === password) {
          return res.json({ role: "employee" });
        } else {
          return res.json({ message: "The password is incorrect" });
        }
      }

      // If not found in EmployeeModel, check EmployerModel
      return EmployerModel.findOne({ username: username });
    })
    .then((employer) => {
      if (employer) {
        // Password match for employer
        if (employer.password === password) {
          return res.json({ role: "employer" });
        } else {
          return res.json({ message: "The password is incorrect" });
        }
      }

      // If not found in either model
      return res.json({ message: "No record exists" });
    })
    .catch((err) => {
      console.log("Error during login:", err);
      res
        .status(500)
        .json({ message: "An error occurred during login", error: err });
    });
});

app.listen(3001, () => {
  console.log("Server is running");
});
