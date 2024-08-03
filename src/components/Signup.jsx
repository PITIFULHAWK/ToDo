import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://back123-250i.onrender.com/signup", {
        username,
        password,
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        navigate("/signin");
      } else {
        setError(response.data.message || "Failed to sign up");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred during signup");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
