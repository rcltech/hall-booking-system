import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import qs from 'query-string';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './components/main/Homepage';
import ChooseRoom from './components/main/ChooseRoom';
import ChooseDate from './components/main/ChooseDate';
import ChooseTime from './components/main/ChooseTime';

const App = () => {
  if (!window.location.host.includes('localhost')) {
    localStorage.setItem('id', qs.parse(window.location.search).id || '');
    if (localStorage.getItem('id') === '') {
      const app_url = 'owl.rctech.club';
      window.location.replace(
        `https://ladybird.rctech.club/?redirectTo=${app_url}`
      );
    }
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/room" component={ChooseRoom} />
          <Route path="/date" component={ChooseDate} />
          <Route path="/time" component={ChooseTime} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
