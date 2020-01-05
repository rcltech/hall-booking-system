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
    margin: 'auto 4px'
  }
}));

const TopBar = props => {
  const classes = useStyles();
  const { goBack, icons } = props;

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
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={icon.onClick}
          >
            {icon.component}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
