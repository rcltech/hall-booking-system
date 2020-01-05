import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  panelText: {
    padding: '20px 20px 20px 20px',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText
  }
}));

export const TimeChooserPanel = ({ date, room }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.panelText} variant="h4">
        Room {room}, {date}
      </Typography>
    </div>
  );
};
