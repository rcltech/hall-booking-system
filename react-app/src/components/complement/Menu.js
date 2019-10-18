import React, { Component } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import MenuIcon from '@material-ui/icons/Menu';

const style = {
  icon: {
    float: 'right'
  },
  logo: {
    width: '20px',
    height: '30px',
    margin: '0 5px'
  }
};

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    let { dropdownOpen } = this.state;
    dropdownOpen = !dropdownOpen;
    this.setState({
      dropdownOpen
    });
  };

  onAppClick = url => {
    window.open(url, '_blank');
  };

  render() {
    const { dropdownOpen } = this.state;
    const { apps } = this.props;
    return (
      <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret color="inherit" style={style.icon}>
          <MenuIcon color="inherit" />
        </DropdownToggle>
        <DropdownMenu>
          {apps.map(app => {
            const { id, name, url, image } = app;
            return (
              <DropdownItem
                key={id}
                onClick={() => {
                  this.onAppClick(url);
                }}
              >
                <img src={image} style={style.logo} alt={name} />
                {name}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
