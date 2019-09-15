import React from 'react'
import axios from 'axios'

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
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });

  }

  render() {
    return (
      <ul>
        {/* {this.state.rooms.map(room => <li key={room._id}>{room.roomName}</li>)} */}
      </ul>
    )
  }
}

export default RoomsList
