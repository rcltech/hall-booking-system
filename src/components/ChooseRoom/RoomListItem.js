import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { RoomListContext } from '../main/ChooseRoom';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  roomCard: {
    width: '100%',
    height: 'content',
    margin: '20px 0',
    padding: '20px 20px',
    display: 'grid',
    gridTemplateColumns: '10% auto 15%',
    backgroundColor: theme.palette.primary.light,
    color: '#fff',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr auto 1fr'
    }
  },
  roomCardSelected: {
    backgroundColor: theme.palette.primary.dark,
    color: '#fafafa',
    transition: theme.transitions.create(['background-color', 'color'], {
      duration: theme.transitions.duration.complex
    })
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
      className={clsx(classes.roomCard, {
        [classes.roomCardSelected]:
          selectedRoom && selectedRoom.name === room.name
      })}
      onClick={() => selectRoom(room)}
      elevation={2}
    >
      <div>
        <Typography variant="h6" color="inherit">
          {room.number}
        </Typography>
      </div>
      <div>
        <Typography variant="h6" color="inherit">
          {room.name}
        </Typography>
      </div>
    </Paper>
  );
};
