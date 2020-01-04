import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Modal, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
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
  imageContainer: {
    textAlign: 'center'
  },
  image: {
    width: '200px',
    height: '200px'
  }
}));

function Modals(props) {
  const { modal, onClick } = props;
  const { isOpen, title, button, image } = modal;
  const classes = useStyles();

  return (
    <Modal open={isOpen} onClose={onClick} className={classes.root}>
      <div className={classes.modal}>
        <Typography variant={'h4'}>{title}</Typography>
        <div className={classes.imageContainer}>
          <img src={image} alt="desc" className={classes.image} />
        </div>
        <Button variant="contained" color="primary" onClick={onClick}>
          {button}
        </Button>
      </div>
    </Modal>
  );
}

export default Modals;
