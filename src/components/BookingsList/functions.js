const moment = require('moment');

const separateEventsByDate = events => {
  const eventsByDate = [];
  events.forEach(event => {
    if (
      eventsByDate.length === 0 ||
      moment(event.dateTime)
        .startOf('date')
        .format() !==
        moment(eventsByDate[eventsByDate.length - 1][0].dateTime)
          .startOf('date')
          .format()
    )
      eventsByDate.push([event]);
    else eventsByDate[eventsByDate.length - 1].push(event);
  });
  return eventsByDate;
};

const separateEventsByMonthAndDate = eventsByDate => {
  const eventsByMonthAndDate = [];
  eventsByDate.forEach(events => {
    if (
      eventsByMonthAndDate.length === 0 ||
      moment(events[0].dateTime)
        .startOf('month')
        .format() !==
        moment(
          eventsByMonthAndDate[eventsByMonthAndDate.length - 1][0][0].dateTime
        )
          .startOf('month')
          .format()
    )
      eventsByMonthAndDate.push([events]);
    else {
      const groupedEvents =
        eventsByMonthAndDate[eventsByMonthAndDate.length - 1];
      groupedEvents.push(events);
    }
  });
  return eventsByMonthAndDate;
};

const displayUsers = users => {
  let value = '';
  users.forEach(user => {
    value += `${user.firstName} ${user.lastName}, `;
  });
  value = value.substring(0, value.length - 2);
  return value;
};

module.exports = {
  separateEventsByDate,
  separateEventsByMonthAndDate,
  displayUsers
};
