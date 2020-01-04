import moment from 'moment';

const validateTime = (timeSlots, start, end) => {
  const startNum = Number(moment(start).format('HH'));
  const endNum = Number(moment(end).format('HH'));
  if (startNum < 7 || startNum > 22 || endNum < 8 || endNum > 23) {
    alert('Time slot out of range');
    return false;
  } else if (endNum - startNum > 2) {
    alert('Maximum hours of booking per person is 2 hours');
    return false;
  } else {
    timeSlots = timeSlots.map(timeslot => Number(timeslot.id));
    for (let i = startNum; i < endNum; ++i) {
      if (timeSlots.includes(i)) {
        alert('Time slot has been occupied');
        return false;
      }
    }
  }
  return true;
};

export default validateTime;
