const mongoose = require("mongoose");
const joi = require("joi");
const { coursesSchema } = require("./coursesModel");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  phone: { type: String, required: true, minlength: 10, maxlength: 15 },
  isEnrolled: { type: Boolean, required: true, default: false },
  course: { type: coursesSchema },
  enrolledDate: { type: Date },
});

const Student = mongoose.model("Student", studentSchema);

function validateData(student) {
  const schema = {
    name: joi.string().min(3).max(50).required(),
    phone: joi.string().min(10).max(15).required(),
    isEnrolled: joi.boolean(),
    course: joi.string(),
    enrolledDate: joi.date(),
  };

  return joi.validate(student, schema);
}

exports.Student = Student;
exports.validate = validateData;
