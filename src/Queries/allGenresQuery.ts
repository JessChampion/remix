import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const GET_GENRES = gql`
  query GET_GENRES {
    genres
      @rest(type: "Genres", path: "/recommendations/available-genre-seeds") {
      genres
    }
  }
`;
