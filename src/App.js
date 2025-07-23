import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Content from "./Components/Content";
import Navbar from "./Components/Navbar";
import Decks from "./Components/Decks";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Search from "./Components/Search";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  return (
    <div className="App">
      <Router>
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={isAuthenticated ? <Content /> : <Navigate to="/login" />}
          />
          <Route
            path="/decks"
            element={isAuthenticated ? <Decks /> : <Navigate to="/login" />}
          />
          <Route
            path="/search"
            element={isAuthenticated ? <Search /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
