import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../complement/Header';
import InfoSection from '../complement/InfoSection';
import { Button } from '@material-ui/core';

const style = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
};

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  handleOnBook = () => {
    this.setState({ redirect: true });
  };

  renderRedirect = () => {
    const { redirect } = this.state;
    return redirect ? <Redirect to="/room" /> : <div></div>;
  };

  render() {
    return (
      <div>
        <Header />
        {this.renderRedirect()}
        <div style={style.buttonContainer}>
          <Button color="secondary" onClick={this.handleOnBook}>
            Book
          </Button>
        </div>
        <InfoSection />
      </div>
    );
  }
}
