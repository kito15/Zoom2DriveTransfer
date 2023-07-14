import cron from 'node-cron';
import axios from 'axios';
import moment from 'moment-timezone';

const urlHourly = 'https://flask-production-d5a3.up.railway.app/authorize';
const urlDaily = 'https://flask-production-d5a3.up.railway.app';

// Set the desired time zone
const desiredTimeZone = 'America/New_York';

// Convert the current date and time to the desired time zone
const currentDateTime = moment().tz(desiredTimeZone);

// Set the desired time of 10 am in the desired time zone
const desiredTime = currentDateTime.clone().set({ hour: 10, minute: 0, second: 0 });

// Calculate the delay in milliseconds from the current time to the desired time
const delayMillis = desiredTime.valueOf() - currentDateTime.valueOf();

// Schedule cron job to run after the delay
cron.schedule(`*/45 * * * *`, () => {
  axios.get(urlHourly)
    .then((response) => {
      const responseData = response.data;
      console.log(`Hourly URL ${urlHourly} executed successfully. Response: `, responseData);
    })
    .catch((error) => {
      console.error(`An error occurred while executing Hourly URL ${urlHourly}: ${error}`);
    });
});

// Schedule cron job to run at the desired time in the desired time zone
setTimeout(() => {
  cron.schedule(`0 10 * * *`, () => {
    axios.get(urlDaily)
      .then((response) => {
        const responseData = response.data;
        console.log(`Daily URL ${urlDaily} executed successfully. Response: `, responseData);
      })
      .catch((error) => {
        console.error(`An error occurred while executing Daily URL ${urlDaily}: ${error}`);
      });
  });
}, delayMillis);
