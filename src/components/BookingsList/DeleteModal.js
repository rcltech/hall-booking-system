import React from 'react';
import {
  Container,
  Icon,
  makeStyles,
  Modal,
  Typography
} from '@material-ui/core';
import { Check, Close, Warning } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    position: 'relative',
    width: '75vw',
    margin: 'auto',
    background: 'white',
    border: '2px solid',
    borderColor: theme.palette.secondary.dark,
    borderRadius: '8px',
    padding: theme.spacing(1),
    textAlign: 'center'
  },
  container: {
    marginTop: theme.spacing(2)
  },
  icon: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    color: theme.palette.secondary.main
  }
}));

const DeleteModal = props => {
  const classes = useStyles();
  const { open, setOpen, confirm, onClick } = props;
  return (
    <Modal open={open} onClose={() => setOpen(false)} className={classes.root}>
      <div className={classes.modal}>
        <Container className={classes.container}>
          <Icon color="error">
            <Warning />
          </Icon>
          <Typography variant={'h6'}>
            Are you sure you want to delete this?
          </Typography>
        </Container>
        <Container className={classes.container}>
          <Icon className={classes.icon} onClick={() => setOpen(false)}>
            <Close />
          </Icon>
          <Icon
            className={classes.icon}
            onClick={() => {
              confirm();
              setOpen(false);
              onClick.forEach(callback => callback());
            }}
          >
            <Check />
          </Icon>
        </Container>
      </div>
    </Modal>
  );
};

export default DeleteModal;
