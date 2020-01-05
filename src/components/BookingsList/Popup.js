import React, { useState } from 'react';
import {
  makeStyles,
  Modal,
  List as MuiList,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import {
  Bookmark,
  Description,
  CalendarToday,
  PersonPin,
  People,
  Create,
  DeleteForever
} from '@material-ui/icons';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_EVENT, GET_EVENTS } from './graphql';
import moment from 'moment';
import { displayUsers } from './functions';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    position: 'relative',
    bottom: '8vh',
    width: '90vw',
    maxHeight: '72vh',
    overflow: 'auto',
    margin: 'auto',
    background: 'white',
    border: '2px solid',
    borderColor: theme.palette.primary.dark,
    borderRadius: '8px',
    padding: theme.spacing(1)
  },
  content: {
    clear: 'both'
  },
  Class: {
    color: theme.palette.class.main
  },
  Info: {
    color: theme.palette.info.main
  },
  Complaint: {
    color: theme.palette.complaint.main
  },
  Others: {
    color: theme.palette.others.main
  }
}));

const Popup = props => {
  const classes = useStyles();
  const { open, setOpen, event } = props;
  const [onUpdate, setOnUpdate] = useState(false);
  const [onDelete, setOnDelete] = useState(false);

  const [doDelete, { data }] = useMutation(DELETE_EVENT, {
    refetchQueries: [{ query: GET_EVENTS }]
  });
  if (data) alert(`${data.deleteEvent ? 'successful' : 'failed'} delete`);

  let fields = [];
  if (Object.entries(event).length !== 0 && event.constructor === Object) {
    if (event.name)
      fields.push({
        id: 'name',
        value: event.name,
        icon: <Bookmark />
      });
    fields = fields.concat([
      {
        id: 'type',
        value: event.type,
        icon: <Description className={classes[event.type]} />
      },
      {
        id: 'dateTime',
        value: moment(event.dateTime).format('MMMM Do h:mm a'),
        icon: <CalendarToday />
      },
      {
        id: 'creator',
        value: `${event.creator.firstName} ${event.creator.lastName}`,
        icon: <PersonPin />
      },
      {
        id: 'participants',
        value: event.participants ? displayUsers(event.participants) : '',
        icon: <People />
      }
    ]);
  }

  const goBack = () => {
    setOnUpdate(false);
    setOpen(false);
  };

  const submitDelete = async () => {
    await doDelete({ variables: { id: event.id } });
  };

  return (
    <Modal open={open} onClose={goBack} className={classes.root}>
      <div className={classes.modal}>
        {!onUpdate ? (
          <EventDetails
            classes={classes}
            goBack={goBack}
            setOnUpdate={setOnUpdate}
            setOnDelete={setOnDelete}
            fields={fields}
          />
        ) : (
          <UpdateEventForm
            setOnUpdate={setOnUpdate}
            confirm={goBack}
            event={event}
          />
        )}
        <DeleteModal
          open={onDelete}
          setOpen={setOnDelete}
          confirm={submitDelete}
          onClick={[goBack]}
        />
      </div>
    </Modal>
  );
};

const EventDetails = props => {
  const { classes, goBack, setOnUpdate, setOnDelete, fields } = props;
  return (
    <div>
      <TopBar
        goBack={goBack}
        icons={[
          {
            id: 'update',
            component: <Create />,
            onClick: () => setOnUpdate(true)
          },
          {
            id: 'delete',
            component: <DeleteForever />,
            onClick: () => setOnDelete(true)
          }
        ]}
      />
      <MuiList className={classes.content} dense>
        {fields.map(field => (
          <ListItem key={field.id}>
            <ListItemIcon>{field.icon}</ListItemIcon>
            <ListItemText primary={field.value} />
          </ListItem>
        ))}
      </MuiList>
    </div>
  );
};

export default Popup;
