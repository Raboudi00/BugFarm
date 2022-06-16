import React from "react";
import { fetchBugs, isCompleted } from "../../../../redux/slices/bugSlice";
import { useDispatch, useSelector } from "react-redux";
import BugCard from "../../../../Components/BugCard/BugCard";

function ViewBugs() {
  const [bugPriority, setBugPriority] = React.useState({
    high: [],
    medium: [],
    low: [],
  });
  const { bugs, status, error } = useSelector((state) => state.bug);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBugs());
    }

    if (bugs?.length > 0) {
      let priority = { high: [], medium: [], low: [] };
      const sort = (arr) => {
        arr.map((bug) => {
          if (bug.priority == 1) return priority.high.push(bug);
          if (bug.priority == 2) return priority.medium.push(bug);
          if (bug.priority == 3) return priority.low.push(bug);
        });
      };
      sort(bugs);
      setBugPriority(priority);
    }
  }, [status]);

  // const checked = (id) => {
  //   dispatch(isCompleted(id));
  // };

  if (status === "pending")
    return (
      <div className="spinContainer">
        <img src={require("../../../../assets/spinner.gif")} alt="Sign in..." />
      </div>
    );
  if (error) return <p>{error}</p>;
  return (
    <div>
      {bugPriority.high.length !== 0 && (
        <BugCard
          bug={bugPriority.high}
          level={"1"}
          // checked={(id) => checked(id)}
        />
      )}
      {bugPriority.medium.length !== 0 ? (
        <BugCard
          bug={bugPriority.medium}
          level={"2"}
          // checked={(id) => checked(id)}
        />
      ) : null}
      {bugPriority.low.length !== 0 ? (
        <BugCard
          bug={bugPriority.low}
          level={"3"}
          // checked={(id) => checked(id)}
        />
      ) : null}
    </div>
  );
}

export default ViewBugs;
