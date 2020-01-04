import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { RoomListContext } from '../main/ChooseRoom';

const useStyles = makeStyles(theme => ({
  roomCard: {
    width: '100%',
    height: 'content',
    margin: '20px 0',
    padding: '20px 10px',
    display: 'grid',
    gridTemplateColumns: '10% auto 15%',
    backgroundColor: '#f5f5f5',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr auto 1fr'
    }
  }
}));

export const RoomListItem = ({ room, selectRoom }) => {
  const classes = useStyles();
  const selectedRoom = useContext(RoomListContext);

  return (
    <Paper
      variant={
        selectedRoom && room.name === selectedRoom.name
          ? 'elevation'
          : 'outlined'
      }
      className={classes.roomCard}
      onClick={() => selectRoom(room)}
      elevation={2}
    >
      <div>{room.number}</div>
      <div>{room.name}</div>
    </Paper>
  );
};
