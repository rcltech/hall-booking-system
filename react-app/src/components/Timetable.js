import React from 'react';
import Calendar from 'react-calendar';
import { Table,Button } from 'reactstrap';


const styles = {
  container : {
    textAlign : 'center',
    width : '100%'
  },
  calendar : {
    width : '90%',
    margin : '0 5%'
  },
  table : {
    width : '60%',
    textAlign : 'center',
    fontSize : '5vw',
    fontWeight : 'bold',
    margin : '0 20%'
  },
  button : {
    
  }
}

const data = [
  {'09:00-10:00' : false},
  {'10:00-11:00' : true},
  {'11:00-12:00' : false},
  {'12:00-13:00' : false},
  {'13:00-14:00' : true},
  {'14:00-15:00' : true},
  {'15:00-16:00' : true},
  {'16:00-17:00' : true},
  {'17:00-18:00' : true},
  {'18:00-19:00' : true},
  {'19:00-20:00' : true},
  {'20:00-21:00' : false},
  {'21:00-22:00' : false},
  {'22:00-23:00' : false},
]

class Timetable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date : new Date(),
      data : props.roomData
    }
  }

  onChange = dateChosen => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    //Prevent user from looking at previous days records
    //And limit them to select up to 7 days from the current date
    if (dateChosen >= today && dateChosen <= nextWeek){
      this.setState({
        date : dateChosen
      })
    }else{
      this.setState({
        date : new Date()
      })
    }
  }

  handleTimeslotOnClick = (isAvailable) => {
    if(!isAvailable){
      alert('We apologize, the timeslot you selected is not available!');
      return;
    }else{
      alert('TODO : Make form component for user confirmation');
      return;
    }
  }

  render() {
    const { date } = this.state;
    const { roomName } = this.props;
    return (
      <div style={styles.container}>
        <h3>Room {roomName}</h3>
        <Calendar
          onChange={this.onChange} 
          value={date}
        />
        <Table borderless style={styles.table}>
          <thead>
            <tr>
              <th>Timeslot</th>
            </tr>
          </thead>
          <tbody>
            {data.map(timeslot => (
              <tr key={Object.keys(timeslot)}>
                <td>
                    <Button 
                      onClick={() => this.handleTimeslotOnClick(timeslot[Object.keys(timeslot)])}
                      style={styles.button}
                      color={timeslot[Object.keys(timeslot)] ? 'success' : 'danger'}
                      block
                    >
                      {Object.keys(timeslot)}
                    </Button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      
    );
  }
}

export default Timetable