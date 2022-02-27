import { ApolloClient, ApolloProvider, from, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import React from 'react';

import './App.css';
import { config } from '../config';

interface ISpotifyApiApolloProvider {
  token: string | null,
  children: React.ReactChild
}

function SpotifyApiApolloProvider({ token, children }: ISpotifyApiApolloProvider) {
  console.log({ token });
  const restLink = new RestLink({ uri: config.api });
  const link = from([restLink]);
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  );
}

export default SpotifyApiApolloProvider;
