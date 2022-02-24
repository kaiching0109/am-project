import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import constants from './constants/constants';
import App from './components/app/app.component';
import UserProvider from './context/userContext';
import ChannelProvider from './context/channelContext';
import ChatProvider from './context/chatContext';
import WithCompose from './hoc/withCompose/withCompose';
// import "regenerator-runtime/runtime";

const httpLink = createHttpLink({
  uri: constants.URL.API,
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <WithCompose components={[UserProvider, ChannelProvider, ChatProvider]}>
        <App />
      </WithCompose>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
