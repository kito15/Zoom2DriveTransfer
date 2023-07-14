import cron from 'node-cron';
import axios from 'axios';
import moment from 'moment-timezone';

const urlHourly = 'https://flask-production-d5a3.up.railway.app/authorize';
const urlDaily = 'https://flask-production-d5a3.up.railway.app';

const timeZone = 'America/New_York';
const cronExpression = moment.tz('0 10 * * *', timeZone).utc().format('m H * * *');

// Schedule cron job to run every 45 minutes
cron.schedule('*/45 * * * *', () => {
  axios.get(urlHourly)
    .then((response) => {
      const responseData = response.data;
      console.log(`Hourly URL ${urlHourly} executed successfully. Response: `, responseData);
    })
    .catch((error) => {
      console.error(`An error occurred while executing Hourly URL ${urlHourly}: ${error}`);
    });
});

// Schedule cron job to run every day at 10 am
cron.schedule(cronExpression, () => {
  axios.get(urlDaily)
    .then((response) => {
      const responseData = response.data;
      console.log(`Daily URL ${urlDaily} executed successfully. Response: `, responseData);
    })
    .catch((error) => {
      console.error(`An error occurred while executing Daily URL ${urlDaily}: ${error}`);
    });
});
