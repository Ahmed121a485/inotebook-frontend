import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./navbar.css";

const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  
  const isLoggedIn = !!localStorage.getItem("token");
  const [user, setUser] = useState(null);

useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}api/auth/getUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      const data = await res.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  fetchUser();
}, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/Login");
  };


  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top shadow-sm">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold fs-3 text-white" to={isLoggedIn ? "/home" : "/Login"}>
          <i className="bi bi-journal-text me-2"></i> iNotebook
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0 text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link px-3 fw-semibold ${
                      location.pathname === "/home" ? "active-nav" : "text-white"
                    }`}
                    to="/home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link px-3 fw-semibold ${
                      location.pathname === "/about" ? "active-nav" : "text-white"
                    }`}
                    to="/about"
                  >
                    About
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Section */}
          <div className="d-flex align-items-center">
            {!isLoggedIn ? (
              <>
                <Link className="btn btn-outline-light rounded-pill mx-2 px-4 fw-semibold" to="/Login">
                  Login
                </Link>
                <Link className="btn btn-warning rounded-pill mx-2 px-4 fw-semibold" to="/Signup">
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle d-flex align-items-center rounded-pill px-3"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt="profile"
                    className="rounded-circle me-2"
                    width="35"
                    height="35"
                  />
                  <span className="fw-semibold">{user?.name || "User"}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow-lg">
                  <li className="dropdown-item text-muted">
                    <small>{user?.email || "user@email.com"}</small>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger fw-semibold" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
