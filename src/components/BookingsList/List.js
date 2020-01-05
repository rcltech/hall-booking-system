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
  separateBookingsByMonthAndDate,
  isUserBooking,
  isToday
} from './functions';
import Popup from './Popup';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 'auto',
    overflow: 'auto',
    maxHeight: 'calc(100vh - 70px)'
  },
  month: {
    background: theme.palette.primary.main,
    marginTop: theme.spacing(2),
    padding: theme.spacing(1)
  },
  monthText: {
    color: theme.palette.primary.contrastText
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
    padding: theme.spacing(1)
  },
  user: {
    backgroundColor: theme.palette.user.main
  },
  others: {
    backgroundColor: theme.palette.others.main
  }
}));

const List = props => {
  const classes = useStyles();
  const { me, bookings } = props;
  const [focusedBooking, setFocusedBooking] = useState({});
  const [openPopup, setOpenPopup] = useState(false);

  const bookingsByDate = separateBookingsByDate(bookings);
  const bookingsByMonthAndDate = separateBookingsByMonthAndDate(bookingsByDate);

  const generateBookingClassNames = username => {
    let classNames = `${classes.booking} `;
    classNames += isUserBooking(me.username, username)
      ? `${classes.user}`
      : `${classes.others}`;
    return classNames;
  };

  return (
    <MuiList className={classes.root} dense={true}>
      {bookingsByMonthAndDate.map(groupedBookings => (
        <div key={groupedBookings[0][0].id}>
          <MonthBlock
            classes={classes}
            dateTime={groupedBookings[0][0].start}
          />
          {groupedBookings.map(bookings => (
            <ListItem
              className={classes.listItem}
              alignItems={bookings.length > 2 ? 'flex-start' : 'center'}
              key={bookings[0].id}
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
                {bookings.map(booking => {
                  const {
                    user: { username }
                  } = booking;
                  return (
                    <Grid item xs={12} key={booking.id}>
                      <Paper
                        elevation={isUserBooking(me.username, username) ? 3 : 0}
                        className={generateBookingClassNames(
                          booking.user.username
                        )}
                        onClick={() => {
                          setFocusedBooking(booking);
                          setOpenPopup(true);
                        }}
                      >
                        <Typography variant={'body1'}>
                          <BookingBlock booking={booking} />
                        </Typography>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </ListItem>
          ))}
        </div>
      ))}
      <Popup
        open={openPopup}
        setOpen={setOpenPopup}
        me={me}
        booking={focusedBooking}
      />
    </MuiList>
  );
};

const MonthBlock = props => {
  const { classes, dateTime } = props;
  return (
    <div className={classes.month}>
      <Typography variant={'h4'} className={classes.monthText}>
        {moment(dateTime).format('MMMM YYYY')}
      </Typography>
    </div>
  );
};

const BookingBlock = props => {
  const { booking } = props;

  return <span>{booking.room.number}</span>;
};

export default List;
