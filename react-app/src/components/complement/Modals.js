import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const style = {
  imageContainer: {
    textAlign: 'center'
  },
  image: {
    width: '200px',
    heght: '200px'
  }
};

export default class Modals extends Component {
  render() {
    const { isOpen, title, button, image, onClick } = this.props;
    return (
      <Modal isOpen={isOpen}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div style={style.imageContainer}>
            <img src={image} alt="desc" style={style.image} />
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
}
