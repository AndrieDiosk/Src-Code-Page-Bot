const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'spotify',
  description: 'search and play spotify song.',
  usage: 'spotify [song name]',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {
    try {
      const { data } = await axios.get(`https://api.zetsu.xyz/search/spotify?q=${encodeURIComponent(args.join(' '))}`);
      const link = data[0]?.result;

      sendMessage(senderId, link ? {
        attachment: { type: 'audio', payload: { url: link, is_reusable: true } }
      } : { text: 'Sorry, no Spotify link found for that query.' }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'Sorry, there was an error processing your request.' }, pageAccessToken);
    }
  }
};
