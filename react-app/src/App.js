import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import InfoSection from './components/InfoSection';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <InfoSection />
      </div>
    );
  }
}
