import React from "react";

function SubmitToast() {
  return (
    <div>
      <button type="button" className="btn btn-primary" id="liveToastBtn">
        Toast Submit
      </button>

      <div
        className="position-absolute bottom-50 end-50 p-3"
        style={{ zIndex: "10000000" }}
      >
        <div
          id="liveToast"
          className="toast hide"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <img src="..." className="rounded me-2" alt="..." />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitToast;
