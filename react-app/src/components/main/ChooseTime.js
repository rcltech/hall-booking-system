import React, { Component } from 'react';
import Timetable from 'react-timetable-events';
import NavBar from '../complement/NavBar.js';
const moment = require('moment');

const sampleEvents = {
  monday: [
    {
      id: 1,
      name: '502B',
      type: 'custom',
      startTime: moment('2018-02-23T11:00:00'),
      endTime: moment('2018-02-23T13:00:00')
    }
  ],
  tuesday: [
    {
      id: 2,
      name: '902',
      type: 'custom',
      startTime: moment('2018-02-22T12:00:00'),
      endTime: moment('2018-02-22T14:00:00')
    },
    {
      id: 3,
      name: '1402B',
      type: 'custom',
      startTime: moment('2018-02-22T16:00:00'),
      endTime: moment('2018-02-22T18:00:00')
    }
  ],
  wednesday: [],
  thursday: [],
  friday: []
};
const style = {
  container: {
    textAlign: 'center'
  }
};

export default class ChooseTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: sampleEvents
    };
  }

  render() {
    let {
      state: { date, room }
    } = this.props.location;
    const { events } = this.state;
    date = moment(date).format('DD-MM-YYYY');
    return (
      <div style={style.container}>
        <NavBar backPath="/room" />
        <p>
          What is the most suitable timeslot for you? <br /> Room : {room}{' '}
          <br /> Date : {date}
        </p>
        <Timetable events={events} />
      </div>
    );
  }
}
