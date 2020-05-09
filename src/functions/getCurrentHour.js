import moment from 'moment';

export const getCurrentHour = () => {
  const currentHour = moment().utcOffset(0);
  currentHour.set({ minute: 0, second: 0, millisecond: 0 });

  return currentHour.toISOString();
};
