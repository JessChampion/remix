import { gql } from "@apollo/client";

export const GET_TOP_ARTISTS = gql`
  query GET_TOP_ARTISTS($timeFrame: String!) {
    topArtists(time_range: $timeFrame, limit: 50)
      @rest(type: "TopArtists", path: "/me/top/artists?{args}") {
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
  query GET_TOP_TRACKS($timeFrame: String!) {
    topTracks(time_range: $timeFrame, limit: 50)
      @rest(type: "TopTracks", path: "/me/top/tracks?{args}") {
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
