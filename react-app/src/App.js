import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import qs from 'qs';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './components/main/Homepage';
import ChooseRoom from './components/main/ChooseRoom';
import ChooseDate from './components/main/ChooseDate';
import ChooseTime from './components/main/ChooseTime';

const GET_ME = gql`
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

const App = () => {
  localStorage.setItem(
    'redirectTo',
    qs.parse(window.location.search).redirectTo || ''
  );
  const { data, loading, error } = useQuery(GET_ME);
  if (loading || !data) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (!localStorage.getItem('authorization' || !data.me)) {
    const app_url = 'rctech-owl.herokuapp.com';
    window.location.replace(
      `https://ladybird.rctech.club/?redirectTo=${app_url}`
    );
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
