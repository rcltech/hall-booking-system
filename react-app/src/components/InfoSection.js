import React from 'react';
//import 'typeface-roboto';
import { Container } from '@material-ui/core';
import { Button } from 'reactstrap';
import Help from './Help';
import Contact from './Contact';
import About from './About';

const styles = {
  container: {
    margin: '1vh auto'
  },
  buttonContainer: {
    maxWidth: '350px',
    margin: 'auto',
    marginBottom: '15px',
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-around'
  },
  button: {
    fontSize: '1em'
  },
  collapseStyles: {
    margin: '10px auto'
  },
  textBody: {
    fontSize: '0.8em'
  }
};

class InfoSection extends React.Component {
  state = {
    helpCollapse: false,
    contactCollapse: false,
    aboutCollapse: false
  };

  toggleHelp = () => {
    this.setState(state => ({
      helpCollapse: !state.helpCollapse,
      contactCollapse: false,
      aboutCollapse: false
    }));
  };

  toggleContact = () => {
    this.setState(state => ({
      helpCollapse: false,
      contactCollapse: !state.contactCollapse,
      aboutCollapse: false
    }));
  };

  toggleAbout = () => {
    this.setState(state => ({
      helpCollapse: false,
      contactCollapse: false,
      aboutCollapse: !state.aboutCollapse
    }));
  };

  render() {
    const { helpCollapse, contactCollapse, aboutCollapse } = this.state;
    return (
      <Container style={styles.container}>
        <div style={styles.buttonContainer}>
          <Button
            color="secondary"
            style={styles.button}
            onClick={this.toggleHelp}
          >
            Help
          </Button>
          <Button
            color="danger"
            style={styles.button}
            onClick={this.toggleContact}
          >
            Report
          </Button>
          <Button
            color="secondary"
            style={styles.button}
            onClick={this.toggleAbout}
          >
            About
          </Button>
        </div>
        <Help
          collapse={helpCollapse}
          collapseStyles={styles.collapseStyles}
          textBodyStyles={styles.textBody}
        />
        <Contact
          collapse={contactCollapse}
          collapseStyles={styles.collapseStyles}
          textBodyStyles={styles.textBody}
        />
        <About
          collapse={aboutCollapse}
          collapseStyles={styles.collapseStyles}
          textBodyStyles={styles.textBody}
        />
      </Container>
    );
  }
}

export default InfoSection;
