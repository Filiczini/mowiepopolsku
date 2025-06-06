// backend/models/Course.js
// Модель курсу

const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    schedule: [Date],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Course", CourseSchema);
