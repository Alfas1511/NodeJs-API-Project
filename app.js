const express = require("express");
const mongoose = require("mongoose");
const categories = require("./Routes/categories");
const courses = require("./Routes/courses");
const students = require("./Routes/students");
const app = express();

mongoose
  .connect("mongodb://localhost/learningDatabase")
  .then(() => console.log("Connection successfull to database"))
  .catch((err) => console.error("Connection failed to database", err));

app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/courses", courses);
app.use("/api/students", students);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on 3000 port");
});
