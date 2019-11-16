import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import MenuIcon from '@material-ui/icons/Menu';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  icon: {
    float: 'right'
  },
  logo: {
    width: '20px',
    height: '30px',
    margin: '0 5px'
  }
}));

function Menu(props) {
  const { apps } = props;
  const [dropdownOpen, toggle] = useState(false);
  const classes = useStyles();

  return (
    <Dropdown isOpen={dropdownOpen} toggle={() => toggle(true)}>
      <DropdownToggle caret color="inherit" className={classes.icon}>
        <MenuIcon color="inherit" />
      </DropdownToggle>
      <DropdownMenu>
        {apps.map(app => {
          const { id, name, url, image } = app;
          return (
            <DropdownItem key={id} onClick={window.open(url, '_blank')}>
              <img src={image} className={classes.logo} alt={name} />
              {name}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
}

export default Menu;
