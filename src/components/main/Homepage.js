import React from 'react';
import Header from '../complement/Header';
import { Calendar } from 'antd';
import 'antd/dist/antd.css';

function Homepage() {
  return (
    <div>
      <Header />
      <Calendar />
    </div>
  );
}

export default Homepage;
