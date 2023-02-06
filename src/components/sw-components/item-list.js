import React from "react";
import ItemList from "../item-list/item-list";
import {
  withData,
  withSwapiService,
  withChildFunction,
  compose,
} from "../hoc-helper";

const renderName = ({ name }) => <span>{name}</span>;
const renderModalandName = ({ model, name }) => (
  <span>
    {name} ({model})
  </span>
);

const mapPersonMethodsToProps = (SwapiService) => {
  return {
    getData: SwapiService.getAllPeople,
  };
};

const mapPlanetMethodsToProps = (SwapiService) => {
  return {
    getData: SwapiService.getAllPlanets,
  };
};

const mapStarshipMethodsToProps = (SwapiService) => {
  return {
    getData: SwapiService.getAllStarships,
  };
};

const PersonList = compose(
  withSwapiService(mapPersonMethodsToProps),
  withData,
  withChildFunction(renderName)
)(ItemList);

const PlanetList = compose(
  withSwapiService(mapPlanetMethodsToProps),
  withData,
  withChildFunction(renderName)
)(ItemList);

const StarshipList = compose(
  withSwapiService(mapStarshipMethodsToProps),
  withData,
  withChildFunction(renderModalandName)
)(ItemList);


export { PersonList, PlanetList, StarshipList };
