import { gql } from 'apollo-boost';

export const ROOM_BOOKINGS = gql`
  query bookings($room: String!) {
    bookings(data: { room: { number: $room } }) {
      start
      end
    }
  }
`;

export const CREATE_BOOKING = gql`
  mutation booking(
    $room_number: String!
    $start: String!
    $end: String!
    $remark: String
  ) {
    createBooking(
      room_number: $room_number
      start: $start
      end: $end
      remark: $remark
    ) {
      createdAt
    }
  }
`;

export const GET_ALL_BOOKINGS = gql`
  query bookings {
    bookings {
      id
      start
      end
      room {
        number
        name
      }
      user {
        username
        first_name
        last_name
        room_no
      }
    }
  }
`;
