import React from "react";
import "./CreateUser.scss";
import { register } from "../../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

function CreateUser() {
  const [input, setInput] = React.useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const state = useSelector((state) => state.user);

  const changeListner = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const reset = () => {
    setInput({
      name: "",
      lastName: "",
      email: "",
      password: "",
      isAdmin: false,
    });
  };

  const dispatch = useDispatch();

  const submitUser = async (e) => {
    e.preventDefault();
    await dispatch(register(input))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  state.status === "pending" && <h1>Loading</h1>;

  return (
    <form className="createUserForm bg-light">
      <h2 className="pb-3 text-secondary">Create user</h2>
      <div className="d-flex gap-1">
        <div className="input-group mb-3 col-4 w-50">
          <span
            className={`input-group-text ${state.error.name && "text-danger"}`}
            id="basic-addon1"
          >
            <i className="fa-solid fa-user"></i>
          </span>

          <input
            value={input.name}
            onChange={changeListner}
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
          />
        </div>
        <div className="input-group mb-3 col-4 w-50">
          <span
            className={`input-group-text ${
              state.error.lastName && "text-danger"
            }`}
            id="basic-addon1"
          >
            @
          </span>
          <input
            value={input.lastName}
            onChange={changeListner}
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div className="input-group mb-3 col-9">
        <span
          className={`input-group-text ${state.error.email && "text-danger"}`}
          id="basic-addon1"
        >
          <i className="fa-solid fa-envelope"></i>
        </span>
        <input
          value={input.email}
          onChange={changeListner}
          type="text"
          className="form-control"
          id="email"
          placeholder="xxx.xx@mail.xx"
        />
      </div>
      <div className="input-group mb-3 col-9">
        <span
          className={`input-group-text ${!input.password && "text-danger"}`}
          id="basic-addon1"
        >
          <i className="fa-solid fa-unlock-keyhole"></i>
        </span>
        <input
          value={input.password}
          onChange={changeListner}
          type="password"
          className="form-control"
          id="password"
          placeholder="account password"
        />
      </div>
      <div className="input-group mb-3 col-9">
        <span className="input-group-text" id="basic-addon1">
          <i className="fa-solid fa-key"></i>
        </span>
        <select
          onChange={changeListner}
          className="form-select form-select-md"
          aria-label=".form-select-md example"
          id="isAdmin"
          defaultValue={false}
        >
          <option value={false}>User</option>
          <option value={true}>Admin</option>
        </select>
      </div>
      <hr />
      <div className="col-2 mt-4 text-center d-flex">
        <button className="btn btn-primary" type="submit" onClick={submitUser}>
          Submit
        </button>
        <button className="btn btn-danger mx-3" type="reset" onClick={reset}>
          Reset
        </button>
      </div>
    </form>
  );
}

export default CreateUser;
