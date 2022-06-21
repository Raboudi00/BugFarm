import Login from "./Views/loginPage/Login";
import Dashboard from "./Views/Dashboard/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import { refreshUser } from "./redux/slices/userSlice";

import "./App.css";
import React from "react";

function App() {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  React.useLayoutEffect(() => {
    jwt && dispatch(refreshUser(jwt));
    setInterval(() => dispatch(refreshUser(jwt)), 900 * 1000);
  }, [dispatch]);

  if (user.status === "pending")
    return (
      <div className="spinContainer">
        <img src={require("./assets/spinner.gif")} alt="Sign in..." />
      </div>
    );
  return (
    <div className="App themed">
      {!user.loggedIn ? (
        <Login />
      ) : (
        <div>
          <Dashboard />
        </div>
      )}
    </div>
  );
}
export default App;
