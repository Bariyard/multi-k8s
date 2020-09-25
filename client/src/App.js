import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import OtherPageComponent from "./pages/other-pages.component";
import FibComponent from "./components/fib.component";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> Fib Calculator Version 2
          </p>
          <br />
          <Link to="/">home</Link>
          <Link to="/otherpage">other page</Link>
        </header>
        <div>
          <Switch>
            <Route exact path="/" component={FibComponent} />
            <Route path="/otherpage" component={OtherPageComponent} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
