const validateTime = (timeslots, start, end) => {
  const startNum = Number(start.format('HH'));
  const endNum = Number(end.format('HH'));
  if (startNum < 7 || startNum > 22 || endNum < 8 || endNum > 23) {
    alert('Timeslot Out of Range');
    return false;
  } else if (endNum - startNum > 2) {
    alert('Maximum hours of booking per person is 2 hours');
    return false;
  } else {
    timeslots = timeslots.map(timeslot => Number(timeslot.id));
    for (let i = startNum; i < endNum; ++i) {
      if (timeslots.includes(i)) {
        alert('Timeslot has been occupied');
        return false;
      }
    }
  }
  return true;
};

export default validateTime;
