import React from 'react'
import axios from 'axios'
import Room from './Room'

const getRoomUrl = 'https://hall-booking-system.herokuapp.com/room';

class RoomsList extends React.Component {
  constructor() {
    super()
    this.state = {
      rooms: [],
    };
  }

  componentDidMount() {
    axios.get(getRoomUrl)
    .then((response) => {
      if(response.status === 500) {
        return
      }
      this.setState({
        rooms: response.data.rooms
      })
  });
  }

  render() {
    const rooms = this.state.rooms.map(room => <Room key={room._id} roomName={room.roomName} />)
    return (
      <div className="roomsList">
        {rooms}
      </div>
    )
  }
}

export default RoomsList
