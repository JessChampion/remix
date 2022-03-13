import { gql } from "@apollo/client";

export const GET_TOP_ARTISTS = gql`
  query GET_TOP_ARTISTS {
    topArtists @rest(type: "TopArtists", path: "/me/top/artists") {
      items {
        id
        images
        name
        uri
        genres
      }
    }
  }
`;

export const GET_TOP_TRACKS = gql`
  query GET_TOP_TRACKS {
    topTracks @rest(type: "TopTracks", path: "/me/top/tracks") {
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
`;
