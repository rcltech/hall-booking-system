import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import {
  Homepage,
  ChooseRoom,
  ChooseDate,
  ChooseTime,
  BookingSummary
} from './components/main';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/room" component={ChooseRoom} />
        <Route path="/date" component={ChooseDate} />
        <Route path="/time" component={ChooseTime} />
        <Route path="/summary" component={BookingSummary} />
      </Switch>
    </Router>
  );
};

export default App;
