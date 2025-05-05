require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Підключення до MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Тут підключайте ваші роутери

const PORT = process.env.PORT || process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/grades", require("./routes/gradeRoutes"));
