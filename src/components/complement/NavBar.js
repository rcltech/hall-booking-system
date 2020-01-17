import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    textAlign: 'left'
  }
}));

export const NavBar = ({ backPath: path }) => {
  const [home, gotoHome] = useState(false);
  const [back, goBack] = useState(false);
  const classes = useStyles();

  if (home) return <Redirect to="/" />;
  if (back) return <Redirect to={path} />;

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={() => goBack(true)}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton color="inherit" onClick={() => gotoHome(true)}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h5" color="inherit" className={classes.title}>
          Booking System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
