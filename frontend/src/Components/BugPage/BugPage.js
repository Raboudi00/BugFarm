import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectBug, deleteBug } from "../../redux/slices/bugSlice";
import "./BugPage.css";

function BugPage() {
  const params = useParams();
  const { bug, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    dispatch(selectBug(params.id));
  }, []);

  return (
    <div className="bugPage bg-light">
      <h4 className="card-header card ps-5">{bug?.bug[0]?.name}</h4>
      <div className="card-body mx-5">
        <h5 className="card-title text-primary">Description :</h5>
        <p className="card-text ps-3">{bug?.bug[0]?.description}</p>
        <hr />
        <h5 className="card-text text-primary">Version:</h5>
        <p className="card-text ps-3">{bug?.bug[0]?.version}</p>
        <hr />
        <h5 className="card-text text-primary">Priority:</h5>
        <p className="card-text ps-3">{bug?.bug[0]?.priority}</p>
        <hr />
        <h5 className="card-text text-primary">Date of creation:</h5>
        <p className="card-text ps-3">{bug?.bug[0]?.createdAt}</p>
        <hr />
        <h5 className="card-text text-primary">Last updated:</h5>
        <p className="card-text ps-3">{bug?.bug[0]?.updatedAt}</p>
        <hr />
        {/* <a href="#" className="btn btn-primary mx-3">
          Edit
        </a> */}
        {user.admin && (
          <a
            href="#"
            className="btn btn-primary text-end"
            onClick={() => dispatch(deleteBug(params.id))}
          >
            Delete
          </a>
        )}
      </div>
    </div>
  );
}

export default BugPage;
