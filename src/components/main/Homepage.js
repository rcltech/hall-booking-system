import React from 'react';
import Header from '../complement/Header';
import InfoSection from '../complement/InfoSection';
import { Calendar } from 'antd';
import 'antd/dist/antd.css';

function Homepage() {
  return (
    <div>
      <Header />
      <Calendar />
      <InfoSection />
    </div>
  );
}

export default Homepage;
