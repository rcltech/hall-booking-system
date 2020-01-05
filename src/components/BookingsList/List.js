import React, { useState } from 'react';
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
import {
  separateBookingsByDate,
  separateBookingsByMonthAndDate
} from './functions';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 'calc(650px + 5vw)',
    margin: 'auto',
    overflow: 'auto',
    maxHeight: 'calc(100vh - 70px)'
  },
  month: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginTop: theme.spacing(2),
    padding: theme.spacing(1)
  },
  icon: {
    textAlign: 'center'
  },
  listItem: {
    marginTop: theme.spacing(2)
  },
  date: {
    padding: theme.spacing(1),
    width: theme.spacing(3),
    height: theme.spacing(3),
    borderRadius: '50%'
  },
  highlightedDate: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
  booking: {
    borderRadius: '8px',
    padding: theme.spacing(1)
  },
  user: {
    backgroundColor: 'red'
  },
  others: {
    backgroundColor: 'blue'
  }
}));

const List = props => {
  const classes = useStyles();
  const { me, bookings } = props;
  const [focusedEvent, setFocusedEvent] = useState({});
  const [openPopup, setOpenPopup] = useState(false);

  const bookingsByDate = separateBookingsByDate(bookings);
  const bookingsByMonthAndDate = separateBookingsByMonthAndDate(bookingsByDate);

  const generateBookingClassNames = username => {
    let classNames = `${classes.booking} `;
    classNames +=
      username === me.username ? `${classes.user}` : `${classes.others}`;
    return classNames;
  };

  return (
    <MuiList className={classes.root} dense={true}>
      {bookingsByMonthAndDate.map(groupedBookings => (
        <div key={groupedBookings[0][0].start}>
          <MonthBlock
            classes={classes}
            dateTime={groupedBookings[0][0].start}
          />
          {groupedBookings.map(bookings => (
            <ListItem
              className={classes.listItem}
              alignItems={bookings.length > 2 ? 'flex-start' : 'center'}
              key={bookings[0].dateTime}
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
                      moment(bookings[0].start)
                        .startOf('date')
                        .format() ===
                      moment()
                        .startOf('date')
                        .format()
                        ? classes.highlightedDate
                        : ''
                    }`}
                  >
                    {moment(bookings[0].start).format('DD')}
                  </Typography>
                </div>
              </ListItemIcon>
              <Grid container spacing={1}>
                {bookings.map(booking => (
                  <Grid item xs={12} sm={5} key={booking.id}>
                    <Paper
                      elevation={2}
                      className={generateBookingClassNames(
                        booking.user.username
                      )}
                      onClick={() => {
                        setFocusedEvent(booking);
                        setOpenPopup(true);
                      }}
                    >
                      <Typography variant={'body1'}>
                        <EventBlock booking={booking} />
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </ListItem>
          ))}
        </div>
      ))}
    </MuiList>
  );
};

const MonthBlock = props => {
  const { classes, dateTime } = props;
  return (
    <div className={classes.month}>
      <Typography variant={'h4'}>
        {moment(dateTime).format('MMMM YYYY')}
      </Typography>
    </div>
  );
};

const EventBlock = props => {
  const { booking } = props;

  return <span>{booking.room.number}</span>;
};

export default List;
