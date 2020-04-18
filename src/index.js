import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme } from './config/theme';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { persistCache } from 'apollo-cache-persist';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Loading } from './components/complement/Loading';

const Index = () => {
  const [client, setClient] = useState(undefined);

  useEffect(() => {
    const uri =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000/graphql'
        : 'https://phoenix.rctech.club/graphql';
    const link = new HttpLink({ uri, credentials: 'same-origin' });

    const cache = new InMemoryCache();
    cache.writeData({
      data: {
        bookingDate: '',
        roomNumber: '',
        start: '',
        end: ''
      }
    });

    const client = new ApolloClient({
      cache,
      link
    });

    persistCache({
      cache,
      storage: window.sessionStorage
    }).then(() => setClient(client));
  }, []);

  if (!client) {
    return <Loading />;
  }

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
