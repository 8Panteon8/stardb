import React from "react";
import { StarshipList } from "../sw-components";
import { useNavigate } from "react-router-dom";

const StarshipPage = () => {
  const navigate = useNavigate();
  const onItemSelected = (id) => {
    navigate(id, { state: id });
  };

  return (
    <div>
      <h1 className="text-center mb-3">Starships</h1>
      <StarshipList onItemSelected={onItemSelected} />
    </div>
  );
};

export default StarshipPage;
