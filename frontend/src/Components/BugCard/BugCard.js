import React from "react";
import "./BugCard.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import EditBug from "../EditBug/EditBug";

function BugCard(props) {
  const bugs = props.bug;
  const level = props.level;
  const color = ["danger", "warning", "success"];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  const bugTable = (bugs) => {
    return bugs.map((bug, index) => {
      const redirect = () => navigate(`/view/${bug._id}`);

      const assignee = user.users.employees?.filter(
        (user) => user.id === bug.assignee
      );

      const assignedBy = user.users.admins?.filter(
        (user) => bug.user_id === user.id
      );

      return (
        <tr key={index}>
          <th scope="row">{index + 1} -</th>
          <td onClick={redirect}>{bug.name}</td>
          <td onClick={redirect}>{bug.version}</td>
          {user.user.isAdmin && (
            <td onClick={redirect}>
              {assignee[0]?.name} {assignee[0]?.lastName}
            </td>
          )}
          {!user.user.isAdmin && (
            <td onClick={redirect}>
              {assignedBy[0]?.name} {assignedBy[0]?.lastName}{" "}
            </td>
          )}
          <td onClick={redirect}>{bug.description}</td>
          <td>
            <input
              type="checkbox"
              className="btn-check"
              id={"btn-check-2-outlined" + index + bug.version}
              autoComplete="off"
              onClick={() => props.checked(bug.id)}
              checked={bug.completed}
            />
            <label
              className="btn btn-outline-success"
              htmlFor={"btn-check-2-outlined" + index + bug.version}
            >
              Fixed
            </label>
            <br />
          </td>
          {user.user.isAdmin && (
            <td>
              <EditBug bug={bug} index={index} />
            </td>
          )}
        </tr>
      );
    });
  };

  return (
    <div className="card-container">
      <div className="accordion " id={"accordionPanel" + level}>
        <div className="accordion-item ">
          <h2
            className="accordion-header "
            id={"panelsStayOpen-heading" + level}
          >
            <button
              className={`accordion-button bg-light text-dark`}
              style={{ backgroundColor: "white" }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#panelsStayOpen-collapse" + level}
              aria-expanded="true"
              aria-controls={"panelsStayOpen-collapse" + level}
            >
              {level == 1 && "High priority"}
              {level == 2 && "Medium priority"}
              {level == 3 && "Low priority"}
              <span
                className={`badge rounded-pill bg-${color[level - 1]} mx-3`}
              >
                {level == 1 && "High"}
                {level == 2 && "Medium"}
                {level == 3 && "Low"}
              </span>
            </button>
          </h2>
          <div
            id={"panelsStayOpen-collapse" + level}
            className="accordion-collapse collapse show"
            aria-labelledby={"panelsStayOpen-heading" + level}
          >
            <div className="accordion-body">
              {/* <h4>{description}</h4>
                        <p>Version: {version}</p>
                        <p>Priority: {priority} </p> */}
              <table className="table table-hover">
                <thead className="text-muted">
                  <tr>
                    <th className="px-4" scope="col"></th>
                    <th className="col-2" scope="col">
                      Bug name
                    </th>
                    <th className="col-1" scope="col">
                      Version
                    </th>
                    {user.user.isAdmin && (
                      <th className="col-2" scope="col">
                        Assignee
                      </th>
                    )}
                    {!user.user.isAdmin && (
                      <th className="col-2" scope="col">
                        Assigned By
                      </th>
                    )}
                    <th className="col-6 overflow-hidden" scope="col">
                      Description
                    </th>
                    <th className="col-1" scope="col">
                      Progress
                    </th>
                    {user.user.isAdmin && (
                      <th className="col-1" scope="col">
                        Edit
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>{bugTable(bugs)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BugCard;
