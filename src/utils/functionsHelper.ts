export const getTodoId = () => {
  const randomNumber = Math.random()
    .toString()
    .slice(-5);

  return +randomNumber;
};

export const getCurrentTime = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getUTCHours() + 1).padStart(2, '0'); // Add 1 hour for UK time zone
  const minutes = String(currentDate.getUTCMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(currentDate.getUTCMilliseconds())
    .padStart(3, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
};
