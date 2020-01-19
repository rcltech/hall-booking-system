import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme } from './config/theme';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import qs from 'query-string';
import { redirectToLogin } from './functions/redirectToLogin';

const Index = () => {
  const isIdEmpty = () => {
    const id = localStorage.getItem('id');
    return id === '' || id === null || id === undefined;
  };

  const returnedId = qs.parse(window.location.search)['id'];
  if (returnedId && returnedId.length > 0) {
    localStorage.setItem('id', returnedId);
    window.location.replace('/');
  }

  if (isIdEmpty()) {
    return redirectToLogin();
  }

  let authorization = localStorage.getItem('id');

  const uri =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/graphql'
      : 'https://phoenix.rctech.club/graphql';

  const cache = new InMemoryCache();

  cache.writeData({
    data: {
      bookingDate: '',
      roomNumber: '',
      start: '',
      end: ''
    }
  });

  const link = new HttpLink({
    uri,
    headers: {
      authorization
    }
  });

  const client = new ApolloClient({
    cache,
    link
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));

serviceWorker.unregister();
