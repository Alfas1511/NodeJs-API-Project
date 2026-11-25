const express = require("express");
const router = express.Router();
const { Course, validate } = require("../Models/coursesModel");
const { Category } = require("../Models/categoriesModel");

// List method
router.get("/", async (req, res) => {
  let courses = await Course.find();
  res.send(courses);
});

// CREATE method
router.post("/", async (req, res) => {
  // validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // --

  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid category Id");

  const course = new Course({
    title: req.body.title,
    category: {
      _id: category._id,
      name: category.name,
    },
    creater: req.body.creater,
    createdDate: req.body.createdDate,
    rating: req.body.rating,
  });
  await course.save();
  res.send(course);
});

// SHOW method
router.get("/:id", (req, res) => {
  const course = Course.findById(req.params.id);
  if (!course)
    return res.status(404).send("The course with the given Id is not found");

  res.send(course);
});

// UPDATE method
router.put("/:id", async (req, res) => {
  // validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid categoryId");

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      category: {
        _id: category._id,
        name: category.name,
      },
      creater: req.body.creater,
      createdDate: req.body.createdDate,
      rating: req.body.rating,
    },
    { new: true },
  );

  if (!course)
    return res.status(404).send("The course with the given Id is not found");

  res.send(course);
});

// DELETE method
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).send("The course with the given Id is not found");
    }

    res.send(course);
  } catch (err) {
    res.status(400).send("Invalid course ID");
  }
});

module.exports = router;
