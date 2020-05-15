import { gql } from 'apollo-boost';

export const ROOM_BOOKINGS = gql`
  query bookings($room: String!, $start_limit: String) {
    bookings(data: { room: { number: $room } }, start_limit: $start_limit) {
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
  query bookings($start_limit: String) {
    bookings(start_limit: $start_limit) {
      id
      start
      end
      remark
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

export const DELETE_BOOKING = gql`
  mutation deleteBooking($id: ID!) {
    deleteBooking(id: $id) {
      id
    }
  }
`;
