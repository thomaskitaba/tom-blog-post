#!/usr/bin/node



// Define the two dates
// calculatedCommentDate


  const calculateDateDifference = (date) => {
  const tempdate = new Date(date)

  const date2 = new Date(tempdate);
  const currentDate = new Date();

  // Compute the difference in milliseconds
  const differenceInMs = currentDate - date2 ;
  const differenceInSeconds = differenceInMs / 1000;
  const differenceInMinutes = differenceInMs / (1000 * 60);
  const differenceInHours = differenceInMs / (1000 * 60 * 60);
  const differenceInDays = differenceInMs /(1000 * 60 * 60 * 24);
  const differenceInMonths = differenceInMs / (1000 * 60 * 60 * 24 * 30);
  const differenceInYears = differenceInMs / (1000 * 60 * 60 * 24 * 365);

  if ((differenceInSeconds >= 0 && differenceInSeconds < 60) || ((differenceInMs >= 0 && differenceInMs < 1000))) {
    return `JustNow`;
  } else if (differenceInMinutes >= 1 &&differenceInMinutes < 60) {
    return `${Math.floor(differenceInMinutes)}min ago`;
  } else if (differenceInHours < 24) {
    return `${Math.floor(differenceInHours)}hrs ago`;
   } else if (differenceInDays >= 1 && differenceInDays <= 30) {
    return `${Math.floor(differenceInDays)}d ago`;
   } else if (differenceInMonths >= 1 && differenceInMonths <= 12) {
    return `${Math.floor(differenceInMonths)}m ago`;
   } else if (differenceInYears >= 1) {
    return `${Math.floor(differenceInYears)}yr ago`;
   } else {
    return '?';
}
  }

const dateDifference = calculateDateDifference('2024-02-17 20:30:00');
console.log(`${dateDifference}`);