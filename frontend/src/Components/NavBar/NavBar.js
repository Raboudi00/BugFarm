import React from "react";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/userSlice";

function NavBar() {
  const { user } = useSelector((state) => state);

  const dispatch = useDispatch();

  const out = () => {
    dispatch(logout());
  };
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-brand  ms-4">
        Bug Farm
        <i className="fa-solid fa-bug ms-3"></i>
      </div>
      <ul className="navbar-nav ms-auto me-3 me-lg-4">
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-user fa-fw"></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <a className="dropdown-item" href="#!">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#!">
                Activity Log
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="/" onClick={out}>
                Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
