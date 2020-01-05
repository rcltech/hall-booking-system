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
      user {
        username
      }
    }
  }
`;

const GET_USER_BOOKINGS = gql`
  query userBookings($username: String!) {
    bookings(data: { user: { username: $username } }) {
      start
      end
    }
  }
`;

const Homepage = () => {
  const { data: meData } = useQuery(GET_ME);
  const { data: allBookingsData } = useQuery(GET_ALL_BOOKINGS);
  const { data: userBookingsData } = useQuery(GET_USER_BOOKINGS, {
    skip: !meData || !meData.me || !meData.me.username,
    variables: { username: meData && meData.me ? meData.me.username : null }
  });

  return (
    <div>
      <Header />
      {/*<List bookings={data} />*/}
    </div>
  );
};

export default Homepage;
