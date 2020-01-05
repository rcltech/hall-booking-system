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
  displayUsers,
  separateEventsByDate,
  separateEventsByMonthAndDate
} from './functions';
import Popup from './Popup';

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
  event: {
    borderRadius: '8px',
    padding: theme.spacing(1)
  },
  classEvent: {
    background: theme.palette.class.main,
    color: theme.palette.class.contrastText
  },
  infoEvent: {
    background: theme.palette.info.main,
    color: theme.palette.info.contrastText
  },
  complaintEvent: {
    background: theme.palette.complaint.main,
    color: theme.palette.complaint.contrastText
  },
  othersEvent: {
    background: theme.palette.others.main,
    color: theme.palette.others.contrastText
  }
}));

const List = props => {
  const classes = useStyles();
  const { events } = props;
  const [focusedEvent, setFocusedEvent] = useState({});
  const [openPopup, setOpenPopup] = useState(false);

  const eventsByDate = separateEventsByDate(events);
  const eventsByMonthAndDate = separateEventsByMonthAndDate(eventsByDate);

  const generateEventClassNames = type => {
    let classNames = `${classes.event} `;
    if (type === 'Class') classNames += classes.classEvent;
    else if (type === 'Info') classNames += classes.infoEvent;
    else if (type === 'Complaint') classNames += classes.complaintEvent;
    else classNames += classes.othersEvent;
    return classNames;
  };

  return (
    <MuiList className={classes.root} dense={true}>
      {eventsByMonthAndDate.map(groupedEvents => (
        <div key={groupedEvents[0][0].dateTime}>
          <MonthBlock
            classes={classes}
            dateTime={groupedEvents[0][0].dateTime}
          />
          {groupedEvents.map(events => (
            <ListItem
              className={classes.listItem}
              alignItems={events.length > 2 ? 'flex-start' : 'center'}
              key={events[0].dateTime}
            >
              <ListItemIcon>
                <div className={classes.icon}>
                  <Typography variant={'button'} display="block">
                    {moment(events[0].dateTime).format('ddd')}
                  </Typography>
                  <Typography
                    variant={'h6'}
                    display="block"
                    className={`${classes.date} ${
                      moment(events[0].dateTime)
                        .startOf('date')
                        .format() ===
                      moment()
                        .startOf('date')
                        .format()
                        ? classes.highlightedDate
                        : ''
                    }`}
                  >
                    {moment(events[0].dateTime).format('DD')}
                  </Typography>
                </div>
              </ListItemIcon>
              <Grid container spacing={1}>
                {events.map(event => (
                  <Grid item xs={12} sm={5} key={event.id}>
                    <Paper
                      elevation={2}
                      className={generateEventClassNames(event.type)}
                      onClick={() => {
                        setFocusedEvent(event);
                        setOpenPopup(true);
                      }}
                    >
                      <Typography variant={'body1'}>
                        <EventBlock event={event} />
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </ListItem>
          ))}
        </div>
      ))}
      <Popup open={openPopup} setOpen={setOpenPopup} event={focusedEvent} />
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
  const { event } = props;
  const participants = displayUsers(event.participants);

  return <span>{event.name ? event.name : participants}</span>;
};

export default List;
