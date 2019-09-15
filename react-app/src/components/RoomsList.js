import React from 'react'
import axios from 'axios'

class RoomsList extends React.Component {
  constructor() {
    super()
    this.state = {
      rooms: [],
    };
  }
  
  componentDidMount() {
    // const res = axios.get('https://hall-booking-system.herokuapp.com/room');
    // alert(res);
    
    axios.get('https://hall-booking-system.herokuapp.com/room').then(res => res.data).then(data => {
      console.log(data)
      // this.setState({
      //   rooms: data.rooms
      // })
    }) 
    .catch(error => {
      console.log(error)
    })
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