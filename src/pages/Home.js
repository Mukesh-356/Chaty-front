// import React from "react";
// import { Link } from "react-router-dom";
// import "../Styles/Home.css"; // 👈 CSS file

// const Home = () => {
//   return (
//     <div className="home-container">
//       <h1 className="home-title">📡ChatVersity</h1>

//       <div className="card-container">
//         <Link to="/admin-login" className="card-link admin">
//           🔐 Admin Portal
//         </Link>
//         <Link to="/user-login" className="card-link user">
//           👤 User Login
//         </Link>
//         <Link to="/register" className="card-link register">
//           📝 Register
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;



import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="college-name">🎓 Muthayammal Engineering College</h1>

      <div className="portal-section">
        <div className="card admin-card" onClick={() => navigate("/admin-login")}>
          <h2>🛠 Admin Portal</h2>
          <p>Manage IP access & monitor users</p>
        </div>

        <div className="card user-card" onClick={() => navigate("/user-login")}>
          <h2>👥 User Access</h2>
          <p>Login or Register to start chatting</p>
        </div>
      </div>

      <div className="features-section">
        <h2 className="features-title">🔧 Application Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🔒 Secure Local WiFi Chat</h3>
            <p>Only users on allowed WiFi can connect & communicate</p>
          </div>
          <div className="feature-card">
            <h3>📁 File & PDF Sharing</h3>
            <p>Send documents, images & PDFs easily during conversation</p>
          </div>
          <div className="feature-card">
            <h3>⌛ Online Time Tracking</h3>
            <p>Track login, logout time & duration of each session</p>
          </div>
          <div className="feature-card">
            <h3>📡 Network-based Access</h3>
            <p>Connects only if you’re under the allowed WiFi IP</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
