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
  Business,
  CalendarToday,
  DeleteForever,
  Notes,
  Person,
  Room
} from '@material-ui/icons';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_BOOKING, GET_ALL_BOOKINGS } from '../../gql/bookings';
import moment from 'moment';
import { DeleteModal } from './DeleteModal';
import { TopBar } from './TopBar';

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
    borderColor: theme.palette.primary.dark,
    borderRadius: '8px',
    padding: theme.spacing(1)
  },
  content: {
    clear: 'both'
  }
}));

export const Popup = ({ open, setOpen, me, booking }) => {
  const classes = useStyles();
  const [onDelete, setOnDelete] = useState(false);

  const [doDelete, { data }] = useMutation(DELETE_BOOKING, {
    refetchQueries: [{ query: GET_ALL_BOOKINGS }]
  });
  if (data) console.log(`${data.deleteBooking.id} deleted`);

  let fields = [];
  if (Object.entries(booking).length !== 0 && booking.constructor === Object) {
    fields = fields.concat([
      {
        id: 'number',
        value: booking.room.number,
        icon: <Room />
      },
      {
        id: 'name',
        value: booking.room.name,
        icon: <Business />
      },
      {
        id: 'startEnd',
        value: `${moment(booking.start).format('MMMM Do h:mm')} - ${moment(
          booking.end
        ).format('h:mm a')}`,
        icon: <CalendarToday />
      },
      {
        id: 'user',
        value: `${booking.user.first_name} ${booking.user.last_name} (${booking.user.room_no})`,
        icon: <Person />
      },
      {
        id: 'remark',
        value: booking.remark ? booking.remark : 'No remark',
        icon: <Notes />
      }
    ]);
  }

  const deletePermission =
    me && booking.user && me.username === booking.user.username;

  const goBack = () => {
    setOpen(false);
  };

  const submitDelete = async () => {
    await doDelete({ variables: { id: booking.id } });
  };

  return (
    <Modal open={open} onClose={goBack} className={classes.root}>
      <div className={classes.modal}>
        <EventDetails
          classes={classes}
          goBack={goBack}
          setOnDelete={setOnDelete}
          fields={fields}
          deletePermission={deletePermission}
        />
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
  const { classes, goBack, setOnDelete, fields, deletePermission } = props;
  return (
    <div>
      <TopBar
        goBack={goBack}
        icons={
          deletePermission
            ? [
                {
                  id: 'delete',
                  component: <DeleteForever />,
                  onClick: () => setOnDelete(true)
                }
              ]
            : []
        }
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
