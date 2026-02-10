// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./AdminDashboard.css";

// const AdminDashboard = () => {
//   const [allowedIPs, setAllowedIPs] = useState([]);
//   const [newIP, setNewIP] = useState("");
//   const [loginHistory, setLoginHistory] = useState([]);
//   const navigate = useNavigate();

//   const fetchIPs = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/allowed-ips");
//       setAllowedIPs(res.data.allowedIPs);
//     } catch {
//       alert("❌ Failed to fetch IPs");
//     }
//   };

//   const handleAdd = async () => {
//     if (!newIP) return;
//     try {
//       await axios.post("http://localhost:5000/api/admin/add-ip", { ip: newIP });
//       setNewIP("");
//       fetchIPs();
//     } catch {
//       alert("❌ Failed to add IP");
//     }
//   };

//   const handleRemove = async (ip) => {
//     try {
//       await axios.post("http://localhost:5000/api/admin/remove-ip", { ip });
//       fetchIPs();
//     } catch {
//       alert("❌ Failed to remove IP");
//     }
//   };

//   const fetchLoginHistory = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/login-history");
//       setLoginHistory(res.data.data);
//     } catch {
//       alert("❌ Failed to fetch login history");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   const formatIST = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
//   };

//   useEffect(() => {
//     fetchIPs();
//     fetchLoginHistory();
//   }, []);

//   return (
//     <div className="admin-container">
//       <div className="admin-header">
//         <h2>🔐 Admin Dashboard</h2>
//         <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
//       </div>

//       <div className="ip-section">
//         <h3>📶 WiFi IP Management</h3>
//         <div className="ip-form">
//           <input
//             type="text"
//             placeholder="Enter WiFi IP Address (e.g., 192.168.1.1)"
//             value={newIP}
//             onChange={(e) => setNewIP(e.target.value)}
//           />
//           <button onClick={handleAdd}>➕ Add</button>
//         </div>

//         <div className="ip-list">
//           {allowedIPs.map((ip, i) => (
//             <div key={i} className="ip-item">
//               <span>{ip}</span>
//               <button onClick={() => handleRemove(ip)}>🗑️</button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="history-section">
//         <h3>📜 User Login History</h3>
//         <div className="table-container">
//           <table>
//             <thead>
//               <tr>
//                 <th>Username</th>
//                 <th>Login Time</th>
//                 <th>Logout Time</th>
//                 <th>Online Duration</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loginHistory.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.username}</td>
//                   <td>{formatIST(item.loginTime)}</td>
//                   <td>{item.logoutTime ? formatIST(item.logoutTime) : "-"}</td>
//                   <td>{item.duration || "-"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Make sure this file exists

const AdminDashboard = () => {
  const [allowedIPs, setAllowedIPs] = useState([]);
  const [newIP, setNewIP] = useState("");
  const [loginHistory, setLoginHistory] = useState([]);
  const [allHistory, setAllHistory] = useState([]); // To preserve original
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const navigate = useNavigate();

  const fetchIPs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/allowed-ips");
      setAllowedIPs(res.data.allowedIPs);
    } catch {
      alert("❌ Failed to fetch IPs");
    }
  };

  const handleAdd = async () => {
    if (!newIP) return;
    try {
      await axios.post("http://localhost:5000/api/admin/add-ip", { ip: newIP });
      setNewIP("");
      fetchIPs();
    } catch {
      alert("❌ Failed to add IP");
    }
  };

  const handleRemove = async (ip) => {
    try {
      await axios.post("http://localhost:5000/api/admin/remove-ip", { ip });
      fetchIPs();
    } catch {
      alert("❌ Failed to remove IP");
    }
  };

  const fetchLoginHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/login-history");
      setLoginHistory(res.data.data);
      setAllHistory(res.data.data); // Keep full data for reset
    } catch {
      alert("❌ Failed to fetch login history");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const formatIST = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  const filterHistory = () => {
    if (!fromDate || !toDate) return alert("Please select both From and To date-time");

    const from = new Date(fromDate).getTime();
    const to = new Date(toDate).getTime();

    const filtered = allHistory.filter((item) => {
      const login = new Date(item.loginTime).getTime();
      return login >= from && login <= to;
    });

    setLoginHistory(filtered);
  };

  useEffect(() => {
    fetchIPs();
    fetchLoginHistory();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>🔐 Admin Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
      </div>

      <div className="ip-section">
        <h3>📶 WiFi IP Management</h3>
        <div className="ip-form">
          <input
            type="text"
            placeholder="Enter WiFi IP Address (e.g., 192.168.1.1)"
            value={newIP}
            onChange={(e) => setNewIP(e.target.value)}
          />
          <button onClick={handleAdd}>➕ Add</button>
        </div>

        <div className="ip-list">
          {allowedIPs.map((ip, i) => (
            <div key={i} className="ip-item">
              <span>{ip}</span>
              <button onClick={() => handleRemove(ip)}>🗑️</button>
            </div>
          ))}
        </div>
      </div>

      <div className="history-section">
        <h3>📜 User Login History</h3>

        <div className="filter-container">
          <label>From:</label>
          <input
            type="datetime-local"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <label>To:</label>
          <input
            type="datetime-local"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <button onClick={filterHistory}>🔍 Filter</button>
          <button onClick={fetchLoginHistory}>♻️ Reset</button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Login Time</th>
                <th>Logout Time</th>
                <th>Online Duration</th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{formatIST(item.loginTime)}</td>
                  <td>{item.logoutTime ? formatIST(item.logoutTime) : "-"}</td>
                  <td>{item.duration || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
