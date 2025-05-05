// backend/controllers/gradeController.js
const Grade = require("../models/Grade");

// Отримати всі оцінки: студент бачить лише свої
exports.getGrades = async (req, res) => {
  const filter = {};
  if (req.user.role === "student") filter.student = req.user.id;
  const grades = await Grade.find(filter).populate("course", "title");
  res.json(grades);
};

// Додати нову оцінку (teacher, admin)
exports.createGrade = async (req, res) => {
  const grade = new Grade({ ...req.body });
  await grade.save();
  res.status(201).json(grade);
};

// Оновити оцінку (admin)
exports.updateGrade = async (req, res) => {
  const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!grade) return res.status(404).json({ message: "Grade not found" });
  res.json(grade);
};

// Видалити оцінку (admin)
exports.deleteGrade = async (req, res) => {
  const grade = await Grade.findByIdAndDelete(req.params.id);
  if (!grade) return res.status(404).json({ message: "Grade not found" });
  res.json({ message: "Grade deleted" });
};
