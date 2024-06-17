import dayjs from 'dayjs';

function formattedDateTime(date) {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
}

export default formattedDateTime;
