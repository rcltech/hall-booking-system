import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import qs from 'query-string';

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#727394',
      main: '#464866',
      dark: '#1d213b'
    },
    secondary: {
      main: '#ef9a9a'
    },
    background: {
      default: '#fff'
    },
    error: {
      main: '#B00020'
    },
    user: {
      main: '#ce93d8'
    },
    others: {
      main: '#9fa8da'
    }
  },
  typography: {
    h1: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 900
    },
    h2: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 800
    },
    h3: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 700
    },
    h4: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 200
    },
    h5: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 600
    },
    h6: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 800,
      fontSize: '1em'
    },
    button: {
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 300
    }
  }
});

theme = responsiveFontSizes(theme);

const Index = () => {
  const isIdEmpty = () => {
    const id = localStorage.getItem('id');
    return id === '' || id === null || id === undefined;
  };

  // make sure that id gets stored correctly first before running anything else
  if (isIdEmpty()) {
    if (qs.parse(window.location.search).id) {
      localStorage.setItem(
        'id',
        qs.parse(window.location.search).id.toString()
      );
    }
  }

  if (isIdEmpty()) {
    const app_url = 'owl.rctech.club';
    const AUTH_URL =
      process.env.NODE_ENV === 'development'
        ? `http://localhost:3001/?redirectTo=localhost:3000`
        : `https://ladybird.rctech.club/?redirectTo=${app_url}`;
    window.location.replace(AUTH_URL);
  }

  let authorization = localStorage.getItem('id');

  const uri =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/graphql'
      : 'https://phoenix.rctech.club/graphql';

  const cache = new InMemoryCache();
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
