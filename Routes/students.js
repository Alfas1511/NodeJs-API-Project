const express = require("express");
const router = express.Router();
const { Student, validate } = require("../Models/studentsModel");
const { Course } = require("../Models/coursesModel");

// List method
router.get("/", async (req, res) => {
  let students = await Student.find();
  res.send(students);
});

// CREATE method
router.post("/", async (req, res) => {
  // validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // --
  if (req.body.isEnrolled && req.body.course) {
    const course = await Course.findById(req.body.course);
    if (!course) return res.status(400).send("Invalid course Id");

    const student = new Student({
      name: req.body.name,
      phone: req.body.phone,
      isEnrolled: req.body.isEnrolled,
      course: {
        _id: course._id,
        title: course.title,
      },
      enrolledDate: req.body.enrolledDate,
    });
    await student.save();
    res.send(student);
  } else {
    const student = new Student({
      name: req.body.name,
      phone: req.body.phone,
    });
    await student.save();
    res.send(student);
  }
});

// SHOW method
router.get("/:id", (req, res) => {
  const student = Student.findById(req.params.id);
  if (!student)
    return res.status(404).send("The student with the given Id is not found");

  res.send(student);
});

// UPDATE method
router.put("/:id", async (req, res) => {
  // validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.isEnrolled && req.body.course) {
    const course = await Course.findById(req.body.course);
    if (!course) return res.status(400).send("Invalid course Id");

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phone: req.body.phone,
        isEnrolled: req.body.isEnrolled,
        course: {
          _id: course._id,
          title: course.title,
        },
        enrolledDate: req.body.enrolledDate,
      },
      { new: true },
    );

    if (!student)
      return res.status(404).send("The student with the given Id is not found");

    await student.save();
    res.send(student);
  } else {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phone: req.body.phone,
        isEnrolled: req.body.isEnrolled,
      },
      { new: true },
    );

    if (!student)
      return res.status(404).send("The student with the given Id is not found");

    res.send(student);
  }
});

// DELETE method
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).send("The student with the given Id is not found");
    }

    res.send(student);
  } catch (err) {
    res.status(400).send("Invalid student ID");
  }
});

function validateData(student) {
  const schema = {
    name: joi.string().min(3).max(50).required(),
    phone: joi.string().min(10).max(15).required(),
    isEnrolled: joi.boolean(),
  };

  return joi.validate(student, schema);
}

module.exports = router;
