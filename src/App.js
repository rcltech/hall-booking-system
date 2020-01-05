import React from 'react';
import './App.css';
import qs from 'query-string';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './components/main/Homepage';
import ChooseRoom from './components/main/ChooseRoom';
import ChooseDate from './components/main/ChooseDate';
import ChooseTime from './components/main/ChooseTime';
import BookingSummary from './components/main/BookingSummary';

const App = () => {
  const isIdEmpty = () => {
    const id = localStorage.getItem('id');
    return id === '' || id === null || id === undefined;
  };

  // make sure that id gets stored correctly first before running anything else
  if (isIdEmpty()) {
    localStorage.setItem('id', qs.parse(window.location.search).id || '');
  }

  if (isIdEmpty()) {
    const app_url = 'owl.rctech.club';
    let url = `https://ladybird.rctech.club/?redirectTo=${app_url}`;
    if (process.env.NODE_ENV === 'development') {
      // local ladybird is hosted at port 3001, owl is hosted at 3000
      url = `http://localhost:3001/?redirectTo=localhost:3000`;
    }
    window.location.replace(url);
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/room" component={ChooseRoom} />
          <Route path="/date" component={ChooseDate} />
          <Route path="/time" component={ChooseTime} />
          <Route path="/summary" component={BookingSummary} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
