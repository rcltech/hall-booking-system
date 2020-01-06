import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Header from '../complement/Header';
import List from '../BookingsList/List';
import 'antd/dist/antd.css';
import { GET_ME } from '../../gql/users';
import { GET_ALL_BOOKINGS } from '../../gql/bookings';

const Homepage = () => {
  const { loading: meLoading, error: meError, data: userData } = useQuery(
    GET_ME
  );
  const {
    loading: bookingsLoading,
    error: bookingsError,
    data: bookingsData
  } = useQuery(GET_ALL_BOOKINGS);

  if (meLoading || bookingsLoading) {
    return <></>;
  }

  if (meError) console.log(meError);
  if (bookingsError) console.log(bookingsError);

  return (
    <div>
      <Header />
      <List me={userData.me} bookings={bookingsData.bookings} />
    </div>
  );
};

export default Homepage;
