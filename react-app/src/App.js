import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import InfoSection from './components/InfoSection'
import RoomsList from './components/RoomsList'
import Room from './components/Room'

function App() {
  return (
    <div>
      <Header />
      <RoomsList />
      <Room />
      <InfoSection />
    </div>
  );
}

export default App;
