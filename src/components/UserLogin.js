import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/UserLogin.css"; // CSS file you will create below

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [clientIP, setClientIP] = useState("");
  const [routerIP, setRouterIP] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocalIP = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/network/info");
        setTimeout(() => {
          // setClientIP(res.data.clientIP);
          setRouterIP(res.data.routerIP);
          setLoading(false);
        }, 2000);
      } catch (err) {
        console.error("❌ Failed to get local IP info", err);
        setLoading(false);
      }
    };
    fetchLocalIP();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        username,
        password,
        ip: routerIP,
      });

      if (res.data.success) {
        localStorage.setItem("username", username);
        alert("✅ Login successful!");
        navigate("/user-dashboard");
      } else {
        alert("❌ Login failed: " + res.data.message);
      }
    } catch (err) {
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

          {loading ? (
            <div className="loader-container">
              <div className="loader"></div>
              <p>Detecting IP addresses...</p>
            </div>
          ) : (
            <div className="ip-info">
              {/* <p><strong>📱 Device IP :</strong> <code>{clientIP}</code></p> */}
              <p><strong>📶 WiFi Router IP :</strong> <code>{routerIP}</code></p>
            </div>
          )}

          <button type="submit" disabled={loading}>Login</button>

          <div className="login-footer">
            <Link to="/" className="back-link">🏠 Back to Home</Link>
            <Link to="/user-register" className="register-link">📝 Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
