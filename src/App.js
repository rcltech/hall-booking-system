import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Homepage } from './components/main/Homepage';
import { ChooseRoom } from './components/main/ChooseRoom';
import { ChooseDate } from './components/main/ChooseDate';
import { ChooseTime } from './components/main/ChooseTime';
import { BookingSummary } from './components/main/BookingSummary';

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
