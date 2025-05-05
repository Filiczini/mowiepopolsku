// backend/controllers/courseController.js
const Course = require("../models/Course");

// Отримати всі курси
exports.getAllCourses = async (req, res) => {
  const courses = await Course.find().populate("teacher", "name email");
  res.json(courses);
};

// Отримати курс за ID
exports.getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id).populate(
    "students",
    "name email"
  );
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
};

// Створити новий курс
exports.createCourse = async (req, res) => {
  const { title, description, schedule } = req.body;
  const course = new Course({
    title,
    description,
    schedule,
    teacher: req.user.id,
  });
  await course.save();
  res.status(201).json(course);
};

// Оновити курс
exports.updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
};

// Видалити курс
exports.deleteCourse = async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json({ message: "Course deleted" });
};

// backend/controllers/gradeController.js
const Grade = require("../models/Grade");

// Отримати оцінки
exports.getGrades = async (req, res) => {
  const filter = {};
  if (req.user.role === "student") filter.student = req.user.id;
  const grades = await Grade.find(filter).populate("course", "title");
  res.json(grades);
};

// Створити нову оцінку
exports.createGrade = async (req, res) => {
  const grade = new Grade({ ...req.body });
  await grade.save();
  res.status(201).json(grade);
};

// Оновити оцінку
exports.updateGrade = async (req, res) => {
  const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!grade) return res.status(404).json({ message: "Grade not found" });
  res.json(grade);
};

// Видалити оцінку
exports.deleteGrade = async (req, res) => {
  const grade = await Grade.findByIdAndDelete(req.params.id);
  if (!grade) return res.status(404).json({ message: "Grade not found" });
  res.json({ message: "Grade deleted" });
};
