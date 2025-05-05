// backend/models/Grade.js
// Модель оцінки студента

const mongoose = require("mongoose");
const GradeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    value: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Grade", GradeSchema);
