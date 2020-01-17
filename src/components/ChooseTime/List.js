import React from 'react';
import {
  List as MuiList,
  ListItem,
  ListItemIcon,
  makeStyles,
  Typography,
  Grid,
  Paper
} from '@material-ui/core';
import moment from 'moment';
import { isToday, separateBookingsByDate } from '../BookingsList/functions';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    overflow: 'auto',
    maxHeight: '50vh',
    padding: 0
  },
  groupedBookings: {
    marginBottom: theme.spacing(5)
  },
  icon: {
    textAlign: 'center',
    width: '35px',
    height: 'content',
    display: 'grid',
    gridTemplateRows: '1fr 1.5fr'
  },
  listItem: {
    margin: 'auto',
    marginTop: theme.spacing(2),
    maxWidth: 'calc(650px + 5vw)'
  },
  date: {
    color: theme.palette.secondary.contrastText,
    borderRadius: '50%',
    paddingTop: '20%'
  },
  highlighted: {
    backgroundColor: theme.palette.secondary.main
  },
  booking: {
    borderRadius: '4px',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.others.main
  }
}));

export const List = ({ bookings }) => {
  const classes = useStyles();

  const groupedBookings = separateBookingsByDate(bookings);

  return (
    <MuiList className={classes.root} dense={true}>
      <div className={classes.groupedBookings}>
        {groupedBookings.map((bookings, index) => (
          <ListItem
            className={classes.listItem}
            alignItems={bookings.length > 2 ? 'flex-start' : 'center'}
            key={index}
          >
            <ListItemIcon>
              <div className={classes.icon}>
                <Typography variant={'button'} display="block">
                  {moment(bookings[0].start).format('ddd')}
                </Typography>
                <Typography
                  variant={'h6'}
                  display="block"
                  className={`${classes.date} ${
                    isToday(bookings[0].start) ? classes.highlighted : null
                  }`}
                >
                  {moment(bookings[0].start).format('DD')}
                </Typography>
              </div>
            </ListItemIcon>
            <Grid container spacing={1}>
              {bookings.map((booking, index) => {
                return (
                  <Grid item xs={12} key={index}>
                    <Paper elevation={0} className={classes.booking}>
                      <BookingBlock booking={booking} />
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </ListItem>
        ))}
      </div>
    </MuiList>
  );
};

const BookingBlock = props => {
  const { booking } = props;
  const { start, end } = booking;

  return (
    <Typography variant="subtitle1">{`${moment(start).format(
      'h:mm'
    )} - ${moment(end).format('h:mm a')}`}</Typography>
  );
};
