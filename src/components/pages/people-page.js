import React from "react";
import Row from "../row";
import { PersonList, PlanetDetails } from "../sw-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const PeoplePage = () => {
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
  }, [id]);

  const navigate = useNavigate();
  const onItemSelected = (id) => {
    navigate(`/people/${id}`);
  };

  return (
    <div>
      <h1 className="text-center mb-3">People</h1>
      <Row
        left={<PersonList onItemSelected={onItemSelected} />}
        right={<PlanetDetails itemId={id} />}
      />
    </div>
  );
};

export default PeoplePage;
