import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Header } from '../Homepage';
import { List } from '../BookingsList/List';
import 'antd/dist/antd.css';
import { GET_ME } from '../../gql/users';
import { GET_ALL_BOOKINGS } from '../../gql/bookings';
import { redirectToLogin, getCurrentHour } from '../../functions';
import { Loading } from '../complement';

export const Homepage = () => {
  const {
    loading: meLoading,
    error: meError,
    data: userData
  } = useQuery(GET_ME, { fetchPolicy: 'network-only' });

  const {
    loading: bookingsLoading,
    error: bookingsError,
    data: bookingsData
  } = useQuery(GET_ALL_BOOKINGS, { variables: { start: getCurrentHour() } });

  if (meLoading || bookingsLoading) {
    return <Loading />;
  }

  if (meError) console.log(meError);
  if (bookingsError) console.log(bookingsError);

  if (!userData || !userData.me) {
    console.log(userData);
    redirectToLogin();
  }

  return (
    <div>
      <Header />
      <List me={userData.me} bookings={bookingsData.bookings} />
    </div>
  );
};
