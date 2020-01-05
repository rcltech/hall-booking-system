import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../complement/NavBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { RoomList } from '../ChooseRoom/RoomList';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Fade from '@material-ui/core/Fade';

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

function ChooseRoom() {
  const [redirect, doRedirect] = useState(false);
  const [selectedRoom, selectRoom] = useState(null);
  const classes = useStyles();

  const GET_ROOMS = gql`
    query rooms {
      rooms {
        number
        name
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_ROOMS);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const { rooms } = data;

  if (redirect)
    return (
      <Redirect
        to={{
          pathname: '/date',
          state: {
            room: selectedRoom.number
          }
        }}
      />
    );

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
          onClick={() =>
            selectedRoom ? doRedirect(true) : alert('Please select a room.')
          }
        >
          <ArrowForwardIcon />
        </Fab>
      </Fade>
    </>
  );
}

export default ChooseRoom;
