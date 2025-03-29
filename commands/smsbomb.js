const axios = require('axios');

module.exports = {
  name: 'smsbomb',
  description: 'Send multiple SMS messages to a number with a delay',
  author: 'Deku (rest api)',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    const [number, delay] = args;

    if (!number || !delay) {
      sendMessage(senderId, { text: 'Usage: smsbomb [number] [delay]' }, pageAccessToken);
      return;
    }

    try {
      const apiUrl = `https://smsbomber.up.railway.app/bomb?number=${number}&seconds=${delay}`;
      const response = await axios.get(apiUrl);
      
      const { message, number, seconds } = response.data;
      if (status) {
        sendMessage(senderId, { text: `Successfully sent SMS messages to ${number} within ${seconds}. ${fail} messages failed.` }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: 'Failed to send SMS messages.' }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error sending SMS messages:', error);
      sendMessage(senderId, { text: 'Sorry, there was an error processing your request.' }, pageAccessToken);
    }
  }
};
