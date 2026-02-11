import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/UserRegister.css"; // ✅ Import CSS

const UserRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://chaty-server-oio8.onrender.com/api/user/register", {
        username,
        email,
        password,
      });

      if (res.data.success) {
        alert("✅ Registered successfully! Please login.");
        navigate("/user-login");
      } else {
        alert("❌ Registration failed: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    }
  };

  return (
    <div className="user-register-container">
      <div className="user-register-card">
        <h2>📝 User Registration</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default UserRegister;
