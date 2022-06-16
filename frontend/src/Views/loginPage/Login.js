import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/slices/userSlice";
import "./Login.css";

function Login() {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    setFormInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    dispatch(signIn(formInput));
  };

  return (
    <div className="loginPage">
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item">
            <img
              src={require("../../assets/bg1.jpg")}
              className="d-block"
              alt="..."
            />
          </div>
          <div className="carousel-item active">
            <img
              src={require("../../assets/bg.jpg")}
              className="d-block"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={require("../../assets/bg2.jpg")}
              className="d-block"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={require("../../assets/bg3.jpg")}
              className="d-block"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={require("../../assets/bg4.jpg")}
              className="d-block"
              alt="..."
            />
          </div>
        </div>
      </div>

      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input
              type="email"
              value={formInput.email}
              name="email"
              required
              onChange={change}
            />
            <label>E-mail</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              required
              value={formInput.password}
              name="password"
              onChange={change}
            />
            <label>Password</label>
          </div>
          <a href="/">
            <button onClick={submit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
          </a>
        </form>
      </div>
    </div>
  );
}

export default Login;
