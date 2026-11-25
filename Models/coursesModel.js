const mongoose = require("mongoose");
const joi = require("joi");
const { categorySchema } = require("./categoriesModel");

const coursesSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 50 },
  category: { type: categorySchema, required: true },
  creater: { type: String, required: true, minlength: 10, maxlength: 15 },
  createdDate: { type: Date, required: true, default: Date.now() },
  rating: { type: Number, required: true },
});

const Course = mongoose.model("Course", coursesSchema);

function validateData(course) {
  const schema = {
    title: joi.string().min(3).max(50).required(),
    category: joi.string().required(),
    creater: joi.string().min(10).max(15).required(),
    createdDate: joi.date(),
    rating: joi.number().min(0).required(),
  };

  return joi.validate(course, schema);
}

exports.Course = Course;
exports.coursesSchema = coursesSchema;
exports.validate = validateData;
