const crypto = require('crypto');
const url = require('url');
const querystring = require('querystring');

const botToken = process.env.BOT_TG_TOKEN;

const handleTelegramOAuthCallback = (req, res) => {
  const parsedUrl = url.parse(req.url);
  const queryParams = querystring.parse(parsedUrl.query);

  const hash = queryParams.hash;
  const payload = JSON.parse(Buffer.from(queryParams.payload, 'base64').toString());

  const secretKey = crypto.createHash('sha256').update(botToken).digest();
  const checkHash = crypto.createHmac('sha256', secretKey).update(queryParams.payload).digest('hex');

  if (hash !== checkHash) {
    res.status(400).send('Invalid hash');
    return;
  }

  const user = payload.user;
  const userId = user.id;
  const firstName = user.first_name;
  const lastName = user.last_name;
  const username = user.username;

  // Handle the user data here
  console.log(`User ID: ${userId}`);
  console.log(`First Name: ${firstName}`);
  console.log(`Last Name: ${lastName}`);
  console.log(`Username: ${username}`);

  res.status(200).send(`User authenticated successfully`);
};

export default handleTelegramOAuthCallback;
