import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const REQUEST_TOKEN = gql`query REQUEST_TOKEN(
input: $input
) {
  token(input) @rest(method:"POST", type: "TokenResponse", path: "/token") {
    data @type(name: "TokenResponse") {
      accessToken: access_token
      refreshToken: refresh_token
    }
  }
}
`;
