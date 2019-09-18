import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import InfoSection from './components/InfoSection'
import RoomsList from './components/RoomsList'

function App() {
  return (
    <div>
      <Header />
      <RoomsList />
      <InfoSection />
    </div>
  );
}

export default App;
