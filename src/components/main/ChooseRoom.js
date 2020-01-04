import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import NavBar from '../complement/NavBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100vw',
    padding: '2%'
  },
  roomCard: {
    width: '100%',
    height: 'content',
    padding: '1%',
    marginBottom: '10px',
    display: 'grid',
    gridTemplateColumns: '10% 45% 45%',
    ['@media (max-width:600px)']: {
      gridTemplateColumns: '1fr 3fr 3fr'
    }
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0'
  }
}));

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
            selectedRoom
          }
        }}
      />
    );

  return (
    <div>
      <NavBar backPath="/" />
      <div className={classes.container}>
        {rooms.map(room => {
          return (
            <Paper
              key={room.name}
              className={classes.roomCard}
              elevation={
                selectedRoom && room.name === selectedRoom.name ? 15 : 1
              }
              onClick={() => selectRoom(room)}
            >
              <div>{room.number}</div>
              <div>{room.name}</div>
            </Paper>
          );
        })}
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
