import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Login.css";

function Login({ setAuthToken, setUser }) {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState(""); // To display error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credential.name,
          password: credential.password,
        }),
      });
      const json = await response.json();
      console.log(json);
  
      if (response.ok) {
        localStorage.setItem("authToken", json.authToken); // Save token
        localStorage.setItem("username", credential.name); // Save username
        setAuthToken(json.authToken); // Update auth state in App
        alert("User logged in successfully!");
        navigate("/"); // Redirect to home
      } else {
        alert(`Error: ${json.message || "Invalid Credentials"}`);
      }
    } catch (error) {
      console.error("Error logging user:", error);
      alert("An error occurred while logging in the user.");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              name="name"
              value={credential.name}
              onChange={handleChange}
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <div className="input-group">
            <input
              name="password"
              value={credential.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>} {/* Display error */}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
