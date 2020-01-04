import React, { useState } from 'react';
import { Calendar, Alert } from 'antd';
import moment from 'moment';

export const DatePicker = () => {
  const [value, selectValue] = useState(moment());
  const [panelValue, setPanelValue] = useState(moment());

  return (
    <>
      <Alert
        message={`You selected date: ${value &&
          moment(value).format('YYYY-MM-DD')}`}
      />
      <Calendar
        value={moment(panelValue)}
        onSelect={value => {
          selectValue(value);
        }}
        onPanelChange={value => {
          setPanelValue(moment(value));
        }}
        disabledDate={date => moment(date).isBefore(moment())}
      />
    </>
  );
};
