import { gql } from 'apollo-boost';

const DELETE_BOOKING = gql`
  mutation deleteBooking($id: ID!) {
    deleteBooking(id: $id) {
      id
    }
  }
`;

const GET_ALL_BOOKINGS = gql`
  query bookings {
    bookings {
      id
      start
      end
      remark
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

export { DELETE_BOOKING, GET_ALL_BOOKINGS };
