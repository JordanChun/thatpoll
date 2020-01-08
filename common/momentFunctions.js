import moment from 'moment';
import 'moment-precise-range-plugin';

function getTimeLimit(endDate) {
  const endTime = moment.utc(endDate).local();
  const currentTime = moment.utc(new Date()).local();
  let timelimit = '';
  
  if (endTime > currentTime) {
    const diff = moment.preciseDiff(endTime, currentTime, true);
    const years = diff.years;
    const months = diff.months;
    const days = diff.days;
    const hours = diff.hours;
    const minutes = diff.minutes;
    if(years > 0) timelimit += ` ${years} years`;
    if(months > 0) timelimit += ` ${months} months`;
    if(days > 0) timelimit += ` ${days} days`;
    if(hours > 0) timelimit += ` ${hours} hours`;
    if(minutes > 0) timelimit += ` ${minutes} minutes`;
    if(timelimit === '') timelimit = ' less than 1 minute';
  } else {
    timelimit = 'Voting Ended';
  }
  
  return timelimit;
}

function getMomentTimelimit(dateCreated, votingPeriod) {
  const endTime = moment.utc(dateCreated).local().add(votingPeriod, 'hours');
  const currentTime = moment.utc(new Date()).local();
  let timelimit = '';

  if (endTime > currentTime) {
    const diff = moment.preciseDiff(endTime, currentTime, true);
    const days = diff.days;
    const hours = diff.hours;
    const minutes = diff.minutes;
    if(days > 0) timelimit += ` ${days} days`;
    if(hours > 0) timelimit += ` ${hours} hours`;
    if(minutes > 0) timelimit += ` ${minutes} minutes`;
    if(timelimit === '') timelimit = ' less than 1 minute';
  } else {
    timelimit = 'Voting Ended';
  }

  return timelimit;
}

export default getTimeLimit;