import { gql } from 'apollo-boost';

export const GET_ROOMS = gql`
  query rooms {
    rooms {
      number
      name
    }
  }
`;
