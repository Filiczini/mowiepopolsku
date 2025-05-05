const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-passwordHash");
  res.json(users);
};

exports.createUser = async (req, res) => {
  const { name, email, passwordHash, role } = req.body;
  const user = new User({ name, email, passwordHash, role });
  await user.save();
  res.status(201).json(user);
};
// Оновлення користувача
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    { name, email, role },
    { new: true }
  );
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// Видалення користувача
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
};
