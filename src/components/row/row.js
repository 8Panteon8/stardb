import React from "react";
import ErrorBoundry from "../error-boundry/error-boundry";
import PropTypes from "prop-types";

const Row = ({ left, right }) => {
  return (
    <div className="row mb-5">
      <div className="col-md-6">{left}</div>
      <div className="col-md-6">
        <ErrorBoundry>{right}</ErrorBoundry>
      </div>
    </div>
  );
};

Row.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node,
};

export default Row;
