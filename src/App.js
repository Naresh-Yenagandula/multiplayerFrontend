import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Chat from "./components/Chat";
import Home from "./components/Home";
import './App.css'

function App() {

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/chat" exact component={Chat} />
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App
