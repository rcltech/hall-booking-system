import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  }
}));

function Header() {
  const classes = useStyles();
  const [booking, doBooking] = useState(false);

  if (booking) return <Redirect to="/room" />;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" color={'inherit'} className={classes.title}>
          Booking system
        </Typography>
        <Button color="inherit" onClick={() => doBooking(true)}>
          Book
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
