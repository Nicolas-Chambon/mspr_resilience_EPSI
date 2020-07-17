require('dotenv').config();
const ActiveDirectory = require('activedirectory');

const config = {
  url: process.env.AD_URL,
  baseDN: process.env.AD_BASE_DN,
  username: process.env.AD_USERNAME,
  password: process.env.AD_PASSWORD,
  defaults: {}
}

const ad = new ActiveDirectory(config);

const adAuthentication = async (user, password) => {
  const username = user + '@resilience34.ml';
  let auth;

  auth = await new Promise(resolve => ad.authenticate(username, password, function(err, auth) {
    if (err) {
      console.error('ERROR: '+ JSON.stringify(err));
      resolve(false);
    }
    if (auth) {
      console.log('Authenticated!');
      resolve(true);
    }
    else {
      console.log('Authentication failed!');
      resolve(false);
    }
  }));
  return auth;
}

//adAuthentication('nicolas.chambon', 'MsprProjet34').then(d => console.log(d));

module.exports = { adAuthentication };
