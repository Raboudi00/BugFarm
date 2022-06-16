import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SideNav.css";

function SideNav() {
  const { user } = useSelector((state) => state);

  return (
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
        <nav
          className="sb-sidenav accordion sb-sidenav-dark"
          id="sidenavAccordion"
        >
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">View</div>
              <Link className="nav-link" to="/">
                <div className="sb-nav-link-icon">
                  <i className="fa-solid fa-bugs"></i>
                </div>
                Bugs List
              </Link>
              <Link className="nav-link" to="/activity">
                <div className="sb-nav-link-icon">
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                Activity
              </Link>

              {user.admin && (
                <>
                  <div className="sb-sidenav-menu-heading">Admin Panel</div>
                  <a
                    className="nav-link collapsed"
                    href="#"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseLayouts"
                    aria-expanded="false"
                    aria-controls="collapseLayouts"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fa-solid fa-id-card"></i>
                    </div>
                    Account Settings
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    className="collapse"
                    id="collapseLayouts"
                    aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordion"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <Link className="nav-link" to="/createuser">
                        Create User
                      </Link>
                    </nav>
                  </div>
                  <a
                    className="nav-link collapsed"
                    href="#"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsePages"
                    aria-expanded="false"
                    aria-controls="collapsePages"
                  >
                    <div className="sb-nav-link-icon">
                      <i className="fa-solid fa-gears"></i>
                    </div>
                    Bug Settings
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    className="collapse"
                    id="collapsePages"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#sidenavAccordion"
                  >
                    <nav
                      className="sb-sidenav-menu-nested nav accordion"
                      id="sidenavAccordionPages"
                    >
                      <Link className="nav-link" to="/createbug">
                        Create Bug
                      </Link>
                    </nav>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small text-center">
              Logged in as: {user.user.isAdmin ? "Administrator" : "User"}
            </div>

            <h6 className="text-center pt-2">
              {user.user.name + " " + user.user.lastName}
            </h6>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default SideNav;
