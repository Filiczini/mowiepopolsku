// backend/routes/courseRoutes.js
const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const auth = require("../middlewares/authMiddleware.js");

// Отримати всі курси
router.get(
  "/",
  auth(["admin", "teacher", "student"]),
  courseController.getAllCourses
);
// Отримати курс за ID
router.get(
  "/:id",
  auth(["admin", "teacher", "student"]),
  courseController.getCourseById
);
// Створити курс (admin, teacher)
router.post("/", auth(["admin", "teacher"]), courseController.createCourse);
// Оновити курс (admin, teacher)
router.put("/:id", auth(["admin", "teacher"]), courseController.updateCourse);
// Видалити курс (admin)
router.delete("/:id", auth(["admin"]), courseController.deleteCourse);

module.exports = router;
