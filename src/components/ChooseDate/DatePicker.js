import React, { useState } from 'react';
import { Calendar, Alert } from 'antd';
import moment from 'moment';

export const DatePicker = ({ selectDate }) => {
  const [panelValue, setPanelValue] = useState(moment());

  return (
    <>
      <Alert
        message={`You selected date: ${panelValue &&
          moment(panelValue).format('YYYY-MM-DD')}`}
      />
      <Calendar
        value={panelValue}
        onSelect={value => {
          setPanelValue(value);
          selectDate(value);
        }}
        onPanelChange={value => {
          if (value.isSameOrAfter(moment(), 'day')) {
            setPanelValue(value);
            selectDate(value);
          }
        }}
        disabledDate={date => moment(date).isBefore(moment(), 'day')}
      />
    </>
  );
};
