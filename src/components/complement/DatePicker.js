import React from 'react';
import { Calendar, Alert } from 'antd';
import moment from 'moment';
import { PropTypes } from 'prop-types';

class DatePicker extends React.Component {
  state = {
    value: new Date(),
    selectedValue: new Date()
  };

  onSelect = value => {
    const { selectDate } = this.props;
    this.setState(
      {
        value: moment(value).toDate(),
        selectedValue: moment(value).toDate()
      },
      () => {
        if (selectDate) selectDate(this.state.selectedValue);
      }
    );
  };

  onPanelChange = value => {
    this.setState({ value: moment(value).toDate() });
  };

  render() {
    const { value, selectedValue } = this.state;
    return (
      <div>
        <Alert
          message={`You selected date: ${selectedValue &&
            moment(selectedValue).format('YYYY-MM-DD')}`}
        />
        <Calendar
          value={moment(value)}
          onSelect={this.onSelect}
          onPanelChange={this.onPanelChange}
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  selectDate: PropTypes.func
};

export default DatePicker;
