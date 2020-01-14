import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Header from '../Homepage/Header';
import List from '../BookingsList/List';
import 'antd/dist/antd.css';
import { GET_ME } from '../../gql/users';
import { GET_ALL_BOOKINGS } from '../../gql/bookings';
import { redirectToLogin } from '../../functions/redirectToLogin';
import Loading from '../complement/Loading';

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
    return <Loading />;
  }

  if (meError) console.log(meError);
  if (bookingsError) console.log(bookingsError);

  if (!userData || !userData.me) return redirectToLogin();

  return (
    <div>
      <Header />
      <List me={userData.me} bookings={bookingsData.bookings} />
    </div>
  );
};

export default Homepage;
