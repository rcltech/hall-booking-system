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

  async componentDidMount() {
    await axios.get(getRoomUrl)
    .then((response) => {
      if(response.status === 500) {
        return
      }
    this.setState({
      rooms: response.data.rooms
    })
  })
  .catch(error => {
    console.error(error)
  })
  }

  render() {
    const roomComponents = this.state.rooms.map(room => <Room key={room._id} roomName={room.roomName}/>)
    return (
      <div className="roomsList">
        {roomComponents}
      </div>
    )
  }
}

export default RoomsList
