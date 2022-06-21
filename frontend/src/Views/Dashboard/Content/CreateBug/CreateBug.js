import React from "react";
import "./CreateBug.css";
import { useDispatch, useSelector } from "react-redux";
import { postBug } from "../../../../redux/slices/bugSlice";
import SubmitToast from "../../../../Components/Toast/submitToast/SubmitToast";

function CreateBug() {
  const [input, setInput] = React.useState({
    name: "",
    version: "",
    assignee: "",
    priority: "1",
    description: "",
  });
  const [error, setError] = React.useState({});

  const dispatch = useDispatch();

  const { bug, user } = useSelector((state) => state);

  const change = (e) => {
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  // React.useEffect(() => {
  //   setError((prev) => {
  //     !!prev && prev.filter((err) => Object.key(err) !== "name");
  //   });
  // }, [input]);

  const reset = () => {
    setInput({
      name: "",
      version: "",
      assignee: "",
      priority: "1",
      description: "",
    });
  };

  const dropDown = (users) => {
    return users.map((user) => (
      <option value={user.id} key={user.id} name="assignee">
        {user.name} {user.lastName}
      </option>
    ));
  };

  const submitBug = async () => {
    await dispatch(postBug(input))
      .then((res) => setError(res.payload.errors))
      .catch((err) => console.log(err));
  };

  if (bug.status === "loading")
    return (
      <div className="spinContainer">
        <img src={require("../../../../assets/spinner.gif")} alt="Sign in..." />
      </div>
    );

  //console.log(Object.keys(error).includes("name"));

  return (
    <div className="createUserForm bg-light">
      <h2 className="text-secondary">Create Bug</h2>
      <table className="table table-borderless ">
        <tbody>
          <tr>
            <td>Bug Name: </td>
            <td>
              <input
                className="form-control"
                type="text"
                placeholder={error?.name ? error.name.message : `Bug name`}
                name="name"
                value={input.name}
                onChange={change}
              />
            </td>
            <td>
              {error?.name && (
                <i className="fa-solid fa-circle-exclamation text-warning"></i>
              )}
            </td>
          </tr>
          <tr>
            <td>Version: </td>
            <td>
              <input
                className="form-control"
                type="text"
                placeholder={
                  error?.version ? error.version.message : `Bug version`
                }
                aria-label="default input example"
                name="version"
                value={input.version}
                onChange={change}
              />
            </td>
            <td>
              {error?.version && (
                <i className="fa-solid fa-circle-exclamation text-warning"></i>
              )}
            </td>
          </tr>
          <tr>
            <td>Assignee</td>
            <td>
              <select
                className="form-select"
                aria-label="Default select example"
                name="assignee"
                onChange={change}
              >
                <option>Select an assignee</option>
                {dropDown(user.users.employees)}
              </select>
            </td>
            <td>
              {error?.assignee && (
                <i className="fa-solid fa-circle-exclamation text-warning"></i>
              )}
            </td>
          </tr>

          <tr>
            <td>Priority</td>
            <td>
              <select
                className="form-select"
                aria-label="Default select example"
                required
                name="priority"
                onChange={change}
              >
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </select>
            </td>
            <td>
              {error?.priority && (
                <i className="fa-solid fa-circle-exclamation text-warning"></i>
              )}
            </td>
          </tr>
          <tr className="mt-4">
            <td>Description: </td>
            <td>
              <div>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  name="description"
                  value={input.description}
                  onChange={change}
                ></textarea>
              </div>
            </td>
            <td>
              {error?.description && (
                <i className="fa-solid fa-circle-exclamation text-warning"></i>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
      <div className="col-8 mt-4 ms-auto d-flex ">
        <SubmitToast />
        <button
          className="btn btn-primary ms-3"
          type="submit"
          onClick={submitBug}
        >
          Submit
        </button>
        <button type="reset" onClick={reset} className="btn mx-4 btn-danger">
          Reset
        </button>
      </div>
    </div>
  );
}

export default CreateBug;
