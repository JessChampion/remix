import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
} from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import React from "react";

import "./App.scss";
import { config } from "../config";

interface ISpotifyApiApolloProvider {
  tokenDetails: ITokenDetails | undefined;
  children: React.ReactChild;
}

function SpotifyApiApolloProvider({
  tokenDetails,
  children,
}: ISpotifyApiApolloProvider) {
  const restLink = new RestLink({
    uri: config.api,
    headers: {
      Authorization: `Bearer ${tokenDetails?.access}`,
    },
  });

  const link = from([restLink]);
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default SpotifyApiApolloProvider;
