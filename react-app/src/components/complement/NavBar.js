import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Menu from './Menu';
import sls from '../../images/apps/sls.png';

const style = {
  container: {
    width: '100%',
    marginBottom: '20px'
  },
  toolbar: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)'
  },
  arrowBack: {
    justifySelf: 'start'
  },
  homeIcon: {
    justifySelf: 'center'
  },
  menuIcon: {
    justifySelf: 'end'
  }
};

const apps = [
  {
    id: 1,
    name: 'SLS',
    url: 'https://sls.rctech.club/',
    image: sls
  }
];

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      back: undefined,
      home: undefined
    };
  }

  renderRedirect = () => {
    const { home, back } = this.state;
    const { backPath: path } = this.props;
    return home ? <Redirect to="/" /> : back ? <Redirect to={path} /> : null;
  };

  render() {
    return (
      <div style={style.container}>
        {this.renderRedirect()}
        <AppBar color="inherit" position="static">
          <Toolbar style={style.toolbar}>
            <Button
              color="inherit"
              style={style.arrowBack}
              onClick={() => this.setState({ back: true })}
            >
              <ArrowBackIcon />
            </Button>
            <Button
              color="inherit"
              style={style.homeIcon}
              onClick={() => this.setState({ home: true })}
            >
              <HomeIcon />
            </Button>
            <Menu style={style.menuIcon} apps={apps} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
