import React, { useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registeredUsers = useSelector((state) => state.registeredUsers);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cek apakah user ada di registeredUsers
    const userFound = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (userFound) {
      dispatch({ type: "LOGIN", payload: { email } });
      navigate("/");
    } else {
      setError(
        "Account not found or password incorrect. Please register first."
      );
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Yu-Gi-Oh! Collection</h1>
      <p className="login-subtitle">Welcome back, Duelist!</p>
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="duelist@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="login-button">
            Enter the Arena
          </button>
        </form>
        <p className="login-footer">
          Don’t have an account?{" "}
          <Link to="/register" className="login-link">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
