import { gql } from 'apollo-boost';

export const DELETE_BOOKING = gql`
  mutation deleteBooking($id: ID!) {
    deleteBooking(id: $id) {
      id
    }
  }
`;

export const GET_ALL_BOOKINGS = gql`
  query bookings {
    bookings {
      start
      end
      room {
        number
        name
      }
      user {
        first_name
        last_name
      }
    }
  }
`;

export default { DELETE_BOOKING, GET_ALL_BOOKINGS };
