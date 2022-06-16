import React from "react";
import { Routes, Route } from "react-router-dom";
import SideNav from "./Sidenav/SideNav";
import NavBar from "../../Components/NavBar/NavBar";
import { ViewBugs, CreateBug, CreateUser, Activity } from "./Content";
import { useDispatch, useSelector } from "react-redux";
import BugPage from "../../Components/BugPage/BugPage";
import { getEmployees } from "../../redux/slices/userSlice";

function Dashboard() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getEmployees());
  }, []);

  return (
    <div className="sb-nav-fixed">
      <NavBar />
      <SideNav />
      <div id="layoutSidenav_content">
        <main>
          <Routes>
            {/* <Route path="/" strict exact element={<h5>Home</h5>} /> */}
            <Route path="/" strict exact element={<ViewBugs />} />
            <Route path="/view/:id" element={<BugPage />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/*" element={<h1>404 not found</h1>} />
            {user.admin && (
              <>
                <Route path="/createbug" strict exact element={<CreateBug />} />
                <Route
                  path="/createuser"
                  strict
                  exact
                  element={<CreateUser />}
                />
              </>
            )}
            {/* {bugs.map((bug, index) => {
            return (
                <Route
                  key={index}
                  path={"view/" + bug.version}
                  element={<BugPage bug={bug} />}
                />
                );
              })} */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
