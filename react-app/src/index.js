import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://phoenix.rctech.club/graphql',
  headers: {
    authorization: localStorage.getItem('id')
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
