import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import qs from 'query-string';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './components/main/Homepage';
import ChooseRoom from './components/main/ChooseRoom';
import ChooseDate from './components/main/ChooseDate';
import ChooseTime from './components/main/ChooseTime';
import BookingSummary from './components/main/BookingSummary';

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

  const ME = gql`
    query me {
      me {
        username
        image_url
        first_name
        last_name
        room_no
      }
    }
  `;
  const { loading, error, data } = useQuery(ME);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(data);

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
