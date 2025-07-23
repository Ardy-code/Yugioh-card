import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import "./navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <h1 className="navbar-title">Yu-Gi-Oh! Card Collection</h1>
      <p className="navbar-subtitle">
        Discover powerful cards and build legendary decks
      </p>

      <div className="navbar-login-wrapper">
        <button className="login-button" onClick={handleLogout}>
          <FiLogOut className="login-icon" /> Logout
        </button>
      </div>

      <div className="navbar-tabs">
        <Link
          to="/"
          className={`tab-button ${location.pathname === "/" ? "active" : ""}`}
        >
          Browse Cards
        </Link>
        <Link
          to="/decks"
          className={`tab-button ${
            location.pathname === "/decks" ? "active" : ""
          }`}
        >
          My Decks
        </Link>
        <Link
          to="/search"
          className={`tab-button ${
            location.pathname === "/search" ? "active" : ""
          }`}
        >
          Search
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
