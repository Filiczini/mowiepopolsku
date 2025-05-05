// backend/routes/userRoutes.js
const express = require("express"); // Підключення Express
const router = express.Router(); // Ініціалізація роутера
const userController = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware.js");

// Отримати всі акаунти (admin)
router.get("/", auth(["admin"]), userController.getAllUsers);
// Створити акаунт (admin)
router.post("/", auth(["admin"]), userController.createUser);
// Оновити акаунт (admin)
router.put("/:id", auth(["admin"]), userController.updateUser);
// Видалити акаунт (admin)
router.delete("/:id", auth(["admin"]), userController.deleteUser);

module.exports = router;
