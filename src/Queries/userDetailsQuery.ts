import { gql } from "@apollo/client";

// eslint-disable-next-line import/prefer-default-export
export const GET_ME = gql`
  query GET_ME {
    me @rest(type: "UserInfo", path: "/me") {
      id
      href
      displayName: display_name
      country
      product
      externalUrls: external_urls {
        spotify
      }
      images {
        url
      }
    }
  }
`;
