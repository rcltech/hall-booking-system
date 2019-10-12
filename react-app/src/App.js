import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './components/main/Homepage';
import ChooseRoom from './components/main/ChooseRoom';
import ChooseDate from './components/main/ChooseDate';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/room" component={ChooseRoom} />
            <Route path="/date" component={ChooseDate} />
          </Switch>
        </div>
      </Router>
    );
  }
}
