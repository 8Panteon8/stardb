import React from "react";
import ErrorButton from "../error-button";

const TestingButton = ({toggleRandomPlanet}) => {
  return (
    <div className="error-button">
      <button
        type="button"
        className="btn btn-warning"
        onClick={toggleRandomPlanet}
      >
        Toggle Random Planet
      </button>
      <ErrorButton />
    </div>
  );
};
export default TestingButton;
