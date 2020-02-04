import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  topBar: {
    margin: theme.spacing(1)
  },
  closeIcon: {
    float: 'left',
    margin: theme.spacing(1)
  },
  buttons: {
    float: 'right'
  },
  button: {
    margin: 'auto'
  }
}));

export const TopBar = ({ goBack, icons }) => {
  const classes = useStyles();

  return (
    <div className={classes.topBar}>
      <ArrowBackIos
        color="primary"
        className={classes.closeIcon}
        onClick={goBack}
      />
      <div className={classes.buttons}>
        {icons.map(icon => (
          <Button
            key={icon.id}
            color="primary"
            className={classes.button}
            onClick={icon.onClick}
          >
            {icon.component}
          </Button>
        ))}
      </div>
      <div style={{ clear: 'both' }} />
    </div>
  );
};
