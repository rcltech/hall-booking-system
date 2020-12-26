import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NavBar, Loading } from '../complement';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { RoomList } from '../ChooseRoom';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Fade from '@material-ui/core/Fade';
import { GET_ROOMS } from '../../gql/rooms';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100vw',
    padding: '2%'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  nextStepButton: {
    position: 'fixed',
    bottom: 20,
    right: 20
  }
}));

export const RoomListContext = React.createContext(null);

export const ChooseRoom = () => {
  const client = useApolloClient();
  const [selectedRoom, selectRoom] = useState(null);
  const { loading, error, data } = useQuery(GET_ROOMS);
  const history = useHistory();

  const classes = useStyles();

  if (loading) return <Loading />;
  if (error) return <div>Error</div>;

  const { rooms } = data;

  const handleNextButtonClick = () => {
    if (selectedRoom) {
      client.writeData({ data: { roomNumber: selectedRoom.number } });
      history.push('/date');
    } else {
      alert('Please select a room.');
    }
  };

  return (
    <>
      <NavBar backPath="/" />
      <div className={classes.container}>
        <RoomListContext.Provider value={selectedRoom}>
          <RoomList rooms={rooms} selectRoom={selectRoom} />
        </RoomListContext.Provider>
      </div>
      <Fade in={selectedRoom !== null}>
        <Fab
          color="primary"
          aria-label="next"
          className={classes.nextStepButton}
          onClick={handleNextButtonClick}
        >
          <ArrowForwardIcon />
        </Fab>
      </Fade>
    </>
  );
};
