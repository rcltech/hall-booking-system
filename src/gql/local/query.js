import { gql } from 'apollo-boost';

export const GET_ROOM_NUMBER = gql`
  {
    roomNumber @client
  }
`;

export const GET_BOOKING_DATE = gql`
  {
    bookingDate @client
    start @client
    end @client
  }
`;
