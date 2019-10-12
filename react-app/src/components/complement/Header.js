import React from 'react';
import logo from '../../images/logo.png';

const style = {
  logo: {
    maxHeight: 'calc(112px + 1vmin)'
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center'
  }
};

function Header() {
  return (
    <div style={style.header}>
      <div>
        <a href="http://rctech.club" target="_blank" rel="noopener noreferrer">
          <img style={style.logo} src={logo} alt="RCTECH" />
        </a>
        <h1>Owl</h1>
      </div>
    </div>
  );
}

export default Header;
