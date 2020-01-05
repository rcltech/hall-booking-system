import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Header from '../complement/Header';
import List from '../BookingsList/List';
import 'antd/dist/antd.css';

const GET_ME = gql`
  query me {
    me {
      username
    }
  }
`;

const GET_ALL_BOOKINGS = gql`
  query bookings {
    bookings {
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
      }
    }
  }
`;

const Homepage = () => {
  const { data: meData } = useQuery(GET_ME);
  const { data: allBookingsData, loading } = useQuery(GET_ALL_BOOKINGS);

  return (
    <div>
      <Header />
      {!loading ? (
        <List me={meData.me} bookings={allBookingsData.bookings} />
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

export default Homepage;
