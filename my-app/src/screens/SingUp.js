import React,{useState} from "react";
import "../Css/SingUp.css"; // Correct the file name if necessary

function SignUp() {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/createUser", {
        method: "POST", // Use uppercase for method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credential.name,
          email: credential.email,
          location: credential.location,
          password: credential.password,
        }),
      });
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        alert("User created successfully!");
      } else {
        alert(`Error: ${json.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An error occurred while creating the user.");
    }
  };

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="input-group">
            <label htmlFor="name">UserName</label>
            <input
              name="name"
              value={credential.name}
              onChange={handleChange}
              type="text"
              id="name"
              placeholder="Enter your username"
            />
          </div>

          {/* Email Field */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              value={credential.email}
              onChange={handleChange}
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          {/* Location Field */}
          <div className="input-group">
            <label htmlFor="location">Location</label>
            <input
              name="location"
              value={credential.location}
              onChange={handleChange}
              type="text"
              id="location"
              placeholder="Enter your location"
            />
          </div>

          {/* Password Field */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              value={credential.password}
              onChange={handleChange}
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;