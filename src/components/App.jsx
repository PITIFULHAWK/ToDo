import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import Signup from "./Signup";
import Todos from "./Todos";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Validate token with the server or decode to check expiry
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    toast.success("Logged out successfully!");
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Keeper</h1>
          {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
        </header>
        <Routes>
          <Route
            path="/signin"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <SignIn setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Signup setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? <Todos /> : <Navigate to="/signin" />
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
