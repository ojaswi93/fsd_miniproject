const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());
// instead of local host u may use 127.0.0.1
mongoose
  .connect("mongodb://localhost:27017/employee")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.post("/register", (req, res) => {
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

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  EmployeeModel.findOne({ username: username }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record exists");
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running");
});
