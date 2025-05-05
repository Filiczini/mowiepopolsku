// frontend/src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Форма входу до системи
const Login = () => {
  const [email, setEmail] = useState(""); // стан для емейлу
  const [password, setPassword] = useState(""); // стан для паролю
  const [error, setError] = useState(""); // повідомлення про помилку
  const navigate = useNavigate(); // хук для переходів

  // Обробник сабміту форми
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token); // зберігаємо токен
      navigate("/dashboard"); // переходимо на дашборд
    } catch (err) {
      setError(err.response?.data?.message || "Помилка при вході");
    }
  };

  return (
    <div className="login-container">
      <h2>Вхід</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Увійти</button>
      </form>
    </div>
  );
};

export default Login;
