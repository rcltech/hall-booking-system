import { gql } from 'apollo-boost';

export const GET_ME = gql`
  query me {
    me {
      username
    }
  }
`;
