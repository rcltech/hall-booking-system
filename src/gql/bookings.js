import { gql } from 'apollo-boost';

export const ROOM_BOOKINGS = gql`
  query bookings($room: String!, $start: String) {
    bookings(data: { room: { number: $room } }, start: $start) {
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
  query bookings($start: String) {
    bookings(start: $start) {
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
