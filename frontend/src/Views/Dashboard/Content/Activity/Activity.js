import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

function Activity() {
  const [chartType, setChartType] = React.useState("bar");

  const chartTypeChange = (e) => {
    setChartType(e.target.id);
  };

  ChartJS.register(...registerables);
  const state = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Bugs found",
        backgroundColor:
          chartType === "bar" ? "rgba(75,192,192,1)" : "rgba(75,192,192,0.2)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: [65, 59, 80, 81, 56, 42, 100, 90, 12, 45, 60, 66],
        fill: true,
        tension: 0.3,
      },
      {
        label: "Bugs fixed",
        backgroundColor: "pink",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        data: [50, 40, 20, 15, 20, 40, 50, 30, 12, 40, 42, 60],
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mx-auto col-2">Statistics</h1>

      <div className="row" height={"50%"}>
        <div className="col-10 mx-auto">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center">
              <i className="fas fa-chart-bar me-1"></i>
              Debugging history
              <div className="ms-auto">
                <button
                  className="btn btn-success mx-2"
                  id="bar"
                  onClick={chartTypeChange}
                >
                  Bar chart
                </button>
                <button
                  className="btn btn-success mx-2"
                  id="line"
                  onClick={chartTypeChange}
                >
                  Linear chart
                </button>
                <button
                  className="btn btn-success mx-2"
                  id="pie"
                  onClick={chartTypeChange}
                >
                  Pie chart
                </button>
              </div>
            </div>
            <div className="card-body">
              {chartType === "bar" && (
                <Bar
                  data={state}
                  options={{
                    title: {
                      display: true,
                      text: "Bugs",
                      fontSize: 20,
                    },
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              )}
              {chartType === "line" && (
                <Line
                  data={state}
                  options={{
                    title: {
                      display: true,
                      text: "Bugs",
                      fontSize: 20,
                    },
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              )}
              {chartType === "pie" && <Pie data={state} />}
            </div>
            <div className="card-footer small text-muted">
              Updated yesterday at 11:59 PM
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-4 col-10 mx-auto bg-light">
        <div className="card-body">
          Chart.js is a third party plugin that is used to generate the charts
          in this template. The charts below have been customized.
        </div>
      </div>
    </div>
  );
}

export default Activity;
