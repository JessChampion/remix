import { gql } from "@apollo/client";

export const GET_SEARCH_ARTISTS = gql`
  query GET_SEARCH_ARTISTS($query: String!) {
    searchArtists(q: $query, type: "artist")
      @rest(type: "SearchArtists", path: "/search?{args}") {
      artists {
        items {
          id
          images
          name
          uri
          genres
        }
      }
    }
  }
`;

export const GET_SEARCH_TRACKS = gql`
  query GET_SEARCH_TRACKS($query: String!) {
    searchTracks(q: $query, type: "track")
      @rest(type: "SearchTracks", path: "/search?{args}") {
      tracks {
        items {
          id
          name
          preview_url
          uri
          artists {
            name
          }
          album {
            name
            images {
              height
              url
              width
            }
          }
        }
      }
    }
  }
`;
