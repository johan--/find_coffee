var instagram = require('instagram-node').instagram();

instagram.use({
  client_id:     process.env.INSTAGRAM_CLIENT_ID,
  client_secret: process.env.INSTAGRAM_CLIENT_SECRET
});

module.exports = instagram;
