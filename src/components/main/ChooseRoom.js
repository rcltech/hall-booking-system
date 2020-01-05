import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from '../complement/NavBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { RoomList } from '../ChooseRoom/RoomList';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100vw',
    padding: '2%'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0'
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
    <div>
      <NavBar backPath="/" />
      <div className={classes.container}>
        <RoomListContext.Provider value={selectedRoom}>
          <RoomList rooms={rooms} selectRoom={selectRoom} />
        </RoomListContext.Provider>
        <Button
          className={classes.buttonContainer}
          color="success"
          block
          onClick={() =>
            selectedRoom ? doRedirect(true) : alert('Please select a room.')
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default ChooseRoom;
