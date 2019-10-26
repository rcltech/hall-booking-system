import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

let authorization = localStorage.getItem('id');
if (window.location.host.includes('localhost')) {
  authorization =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiU2VhbiIsImltYWdlX3VybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BQXVFN21CM1BnQ0xubGstSUlCcEZwNV9ISUtKeHhqSFN5ZWJ5Tnc0OHBoNXNRPXM5Ni1jIiwicm9vbV9ubyI6IjkxNUIiLCJlbWFpbCI6InNlYW5jaG9rQGNvbm5lY3QuaGt1LmhrIiwidXNlcm5hbWUiOiI5OHNlYW45OCIsImlkIjoiY2sxcW5yaWhxNHZ1bjA3NzRrMDYyanJjaCIsImxhc3RfbmFtZSI6IkNob2siLCJwaG9uZSI6Iis4NTI2NzM0ODEzNSIsImlhdCI6MTU3MzE0OTAyNn0.ZsPeMkDtIVcNtXEw41V8fJPe3ORbSh7V-XX9dlIXFOg';
}

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://phoenix.rctech.club/graphql',
  headers: {
    authorization
  }
});

const client = new ApolloClient({
  cache,
  link
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token')
  }
});

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#CFD8DC',
      main: '#607D8B',
      dark: '#455A64'
    },
    secondary: {
      main: '#E1E8F0'
    }
  }
});

theme = responsiveFontSizes(theme);

const Index = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>
);

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
