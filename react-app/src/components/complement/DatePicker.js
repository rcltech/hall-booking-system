import React from 'react';
import { Calendar, Alert } from 'antd';
import moment from 'moment';
import { PropTypes } from 'prop-types';

class DatePicker extends React.Component {
  state = {
    value: moment(new Date()),
    selectedValue: moment(new Date())
  };

  onSelect = value => {
    const { selectDate } = this.props;
    this.setState(
      {
        value,
        selectedValue: value
      },
      () => {
        if (selectDate) selectDate(this.state.selectedValue);
      }
    );
  };

  onPanelChange = value => {
    this.setState({ value });
  };

  render() {
    const { value, selectedValue } = this.state;
    return (
      <div>
        <Alert
          message={`You selected date: ${selectedValue &&
            selectedValue.format('YYYY-MM-DD')}`}
        />
        <Calendar
          value={value}
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
