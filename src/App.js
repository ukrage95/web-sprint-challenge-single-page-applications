import { Route, BrowserRouter as Router, Switch } from "react-router-dom"

import Confirmation from "./components/confirmation";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Pizza from "./components/Pizza";
import React from "react";

const App = () => {
  return (
    <Router>
      <h1>Lambda Eats</h1>
      <Nav />
      <Switch>
        <Route path="/Pizza">
          <Pizza />
        </Route>
        <Route path ="/confirmation">
          <Confirmation />
        </Route>
        <Route path ="/">
          <Home />
        </Route>
      </Switch>

    </Router>
  );
};
export default App;