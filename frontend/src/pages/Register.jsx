// frontend/src/pages/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Форма реєстрації нового користувача
const Register = () => {
  const [name, setName] = useState(""); // стан для імені
  const [email, setEmail] = useState(""); // стан для емейлу
  const [password, setPassword] = useState(""); // стан для паролю
  const [error, setError] = useState(""); // повідомлення про помилку
  const navigate = useNavigate(); // хук для навігації

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Відправляємо дані на реєстрацію
      await axios.post("/api/auth/register", { name, email, password });
      navigate("/login"); // після успіху переходимо на сторінку входу
    } catch (err) {
      setError(err.response?.data?.message || "Помилка при реєстрації");
    }
  };

  return (
    <div className="register-container">
      <h2>Реєстрація</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Імʼя</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Емейл</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
};

export default Register;
