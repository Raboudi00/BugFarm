import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBug } from "../../redux/slices/bugSlice";

function EditBug(props) {
  const [input, setInput] = React.useState({ ...props.bug });
  const { id } = props.bug;

  const dispatch = useDispatch();

  const { bug, user } = useSelector((state) => state);
  const dropDown = (users) => {
    return users.map((user) => (
      <option value={user.id} key={user.id} id="assignee">
        {user.name} {user.lastName}
      </option>
    ));
  };

  const change = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  React.useEffect(() => {
    const exampleModal = document.getElementById(id);

    exampleModal.addEventListener("show.bs.modal", function (event) {
      const button = event.relatedTarget;

      const recipient = JSON.parse(button.getAttribute("data-bs-bug"));
      setInput(recipient);

      const name = exampleModal.querySelector("#name");
      const version = exampleModal.querySelector("#version");
      const description = exampleModal.querySelector("#description");
      const priority = exampleModal.querySelector("#priority");
      const assignee = exampleModal.querySelector("#assignee");

      name.value = recipient.name;
      version.value = recipient.version;
      description.value = recipient.description;
      priority.value = recipient.priority;
      assignee.value = recipient.assignee;
    });
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-flex align-items-center"
        data-bs-toggle="modal"
        data-bs-target={`#${input.id}`}
        data-bs-bug={JSON.stringify(props.bug)}
      >
        Edit
        <i className="fa-solid fa-wrench ps-2"></i>
      </button>

      <div
        className="modal fade"
        id={`${id}`}
        tabIndex="-1"
        aria-labelledby={`exampleModalLabel`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`exampleModalLabel`}>
                Editing bug
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">
                    Bug name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    onChange={change}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="version" className="form-label">
                    Bug Version
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="version"
                    onChange={change}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="priority" className="form-label">
                    Priority
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    required
                    id="priority"
                    onChange={change}
                  >
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                  </select>
                </div>
                <div className="col-12">
                  <label htmlFor="inputAddress2" className="form-label">
                    Assignee
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="assignee"
                    onChange={change}
                  >
                    <option>Select an assignee</option>
                    {dropDown(user.users.employees)}
                  </select>
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputZip" className="form-label">
                    Description
                  </label>
                  <div>
                    <textarea
                      className="form-control"
                      rows="4"
                      id="description"
                      onChange={change}
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => dispatch(updateBug(input))}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBug;
