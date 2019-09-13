import React from 'react';
import logo from '../images/logo.png';

function Header() {
  return(
    <div className="header">
      <div>
        <a href='http://rctech.club' target='_blank' rel='noopener noreferrer'>
          <img className="logo" src={logo} alt="RCTECH"/>
        </a>
        <h1>HaBoS</h1>
      </div>
    </div>
  )
}

export default Header