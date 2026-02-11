import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/UserLogin.css";

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://chaty-server-oio8.onrender.com/api/user/login",
        {
          username,
          password,
        }
      );

      if (res.data.success) {
        localStorage.setItem("username", username);
        alert("✅ Login successful!");
        navigate("/user-dashboard");
      } else {
        alert("❌ Login failed: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    }
  };

  return (
    <div className="user-login-container">
      <div className="user-login-card">
        <h2>👤 User Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit">Login</button>

          <div className="login-footer">
            <Link to="/" className="back-link">🏠 Back</Link>
            <Link to="/user-register" className="register-link">📝 Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
