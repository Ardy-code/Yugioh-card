import React, { useState } from "react";
import "./register.css";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { email, password };

    dispatch({ type: "REGISTER", payload: newUser });

    navigate("/login");
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Yu-Gi-Oh! Collection</h1>
      <p className="register-subtitle">Join the battle, new Duelist!</p>
      <div className="register-card">
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
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="register-button">
            Join the Duel
          </button>
        </form>
        <p className="register-footer">
          Already have an account?{" "}
          <Link to="/login" className="register-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
