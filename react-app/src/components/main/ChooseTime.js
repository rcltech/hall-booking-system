import React, { Component } from 'react';
import Timetable from 'react-timetable-events';
import { Redirect } from 'react-router-dom';
import NavBar from '../complement/NavBar';
import Timepicker from '../complement/Timepicker';
import getRooms from '../../functions/getRooms';
import moment from 'moment';
import validateTime from '../../functions/validateTime';

const style = {
  container: {
    textAlign: 'center'
  }
};

export default class ChooseTime extends Component {
  constructor(props) {
    const {
      state: { room, date }
    } = props.location;
    let start = moment(date);
    let end = moment(date);
    start.set({ hour: 12 });
    end.set({ hour: 13 });
    super(props);
    this.state = {
      events: undefined,
      room,
      date,
      start,
      end,
      redirect: false
    };
  }

  componentDidMount = async () => {
    const { room, date } = this.state;
    this.setState({
      events: await getRooms(room, date)
    });
  };

  onContinue = async (start, end) => {
    const { events } = this.state;
    if (!events) {
      return;
    } else {
      const timeslots = events[Object.keys(events)[0]];
      this.setState({
        redirect: await validateTime(timeslots, start, end),
        start,
        end
      });
    }
  };

  renderRedirect = () => {
    const { room, date, start, end, redirect } = this.state;
    return redirect ? (
      <Redirect
        to={{
          pathname: '/summary',
          state: {
            room,
            date,
            start: moment(start).format('HH:00'),
            end: moment(end).format('HH:00')
          }
        }}
      />
    ) : (
      <div></div>
    );
  };

  render() {
    const { events, room, date, start, end } = this.state;
    let dateString = moment(date).format('LL');
    return (
      <div style={style.container}>
        {this.renderRedirect()}
        <NavBar backPath="/room" />
        <p>
          What is the most suitable timeslot for you? <br /> Room : {room}{' '}
          <br /> Date : {dateString}
        </p>
        <Timepicker start={start} end={end} onContinue={this.onContinue} />
        {events ? <Timetable events={events} /> : <div></div>}
      </div>
    );
  }
}
