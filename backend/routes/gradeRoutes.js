// backend/routes/gradeRoutes.js
const express = require("express");
const router = express.Router();
const gradeController = require("../controllers/gradeController");
const auth = require("../middlewares/authMiddleware.js");

// Отримати оцінки (admin, teacher або власний студент)
router.get(
  "/",
  auth(["admin", "teacher", "student"]),
  gradeController.getGrades
);
// Створити оцінку (admin, teacher)
router.post("/", auth(["admin", "teacher"]), gradeController.createGrade);
// Оновити оцінку (admin)
router.put("/:id", auth(["admin"]), gradeController.updateGrade);
// Видалити оцінку (admin)
router.delete("/:id", auth(["admin"]), gradeController.deleteGrade);

module.exports = router;
