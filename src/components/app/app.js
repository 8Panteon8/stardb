import React, { Component } from "react";
import "./app.css";
import Header from "../header";
import RandomPlanet from "../random-planet";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import ErrorBoundry from "../error-boundry";
import TestingButton from "../testing-button";
import { SwapiServiceProvider } from "../swapi-service-context";
import {
  PeoplePage,
  StarshipPage,
  PlanetPage,
  LoginPage,
  SecretPage,
} from "../pages";
import { Routes, Route } from "react-router-dom";
import { StarshipDetails } from "../sw-components";
import { withRouter } from "../hoc-helper";

class App extends Component {
  state = {
    showRandomPlanet: true,
    swapiService: new SwapiService(),
    isLoggedIn: false,
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true,
    });
  };

  onToggle = () => {
    const vis = this.state.showRandomPlanet;
    this.setState({ showRandomPlanet: !vis });
  };
  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      return {
        swapiService: new Service(),
      };
    });
  };
  selectId = (id) => {
    console.log(id);
    this.setState({ id });
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
      };
    });
  };

  render() {
    const { state } = this.props.location;

    const { showRandomPlanet, isLoggedIn } = this.state;

    const showPlanet = showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="container">
            <Header onServiceChange={this.onServiceChange} />
            {showPlanet}
            <TestingButton toggleRandomPlanet={this.toggleRandomPlanet} />
            <Routes>
              <Route path="/" element={<h2>Welcome to StarDB</h2>} />
              <Route path="/people">
                <Route index element={<PeoplePage />} />
                <Route path=":id" element={<PeoplePage />} />
              </Route>
              <Route path="/planets" element={<PlanetPage />} />
              <Route path="/starships">
                <Route index element={<StarshipPage />} />
                <Route
                  path=":id"
                  element={<StarshipDetails itemId={state} />}
                />
              </Route>
              <Route
                path="/login"
                element={
                  <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />
                }
              />
              <Route
                path="/secret"
                element={<SecretPage isLoggedIn={isLoggedIn} />}
              />
              <Route path="*" element={<h2>Page not found</h2>} />
            </Routes>
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}

export default withRouter(App);
