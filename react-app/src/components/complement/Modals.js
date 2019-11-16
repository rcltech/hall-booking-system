import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  imageContainer: {
    textAlign: 'center'
  },
  image: {
    width: '200px',
    height: '200px'
  }
}));

function Modals(props) {
  const classes = useStyles();
  const { isOpen, title, button, image, onClick } = props;
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <div className={classes.imageContainer}>
          <img src={image} alt="desc" className={classes.image} />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={onClick}>
          {button}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default Modals;
