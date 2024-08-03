import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://back123-250i.onrender.com/signin", {
        username,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setError(response.data.message || "Failed to sign in");
      }
    } catch (error) {
      console.error("Signin error:", error);
      setError("An error occurred during signin");
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
