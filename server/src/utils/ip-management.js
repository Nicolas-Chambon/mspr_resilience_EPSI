const database = require('../database');
const sendEmail = require('../utils/aws-ses');

const userExists = async (email) => {
  return await database.select('*')
    .from('users')
    .where({username: email})
    .then(data => {
      return data.length !== 0;
    }).catch((err) => {
      return err;
    });
}

const isVerifiedIp = async (username, ip) => {
  return await database.select('*')
    .from('user_ip')
    .where({username: username, ip: ip})
    .then(data => {
      return data.length > 0 ? data[0].verified : false;
    }).catch((e) => {
      console.error(e);
    });
}

const addToVerifiedIp = async (username, email, ipInfo) => {
  let verified = false;
  if (ipInfo.country === 'FR') {
    verified = true;
    sendEmail([email], "Adresse IP inconne",
      "<body>" +
      "<p>Une nouvelle connexion a été détectée à partir de cette adresse ip : "
      + ipInfo.ip + ", localisée à " + ipInfo.city + ', ' + ipInfo.region + ', ' + ipInfo.country + "</p>" +
      "</body>"
    );
  }
  try {
    const ipExists = await database.table('ip_addr').select('*').where({ip: ipInfo.ip});
    console.log('ipExists : ', ipExists);
    if (ipExists.length === 0) {
      await database.table('ip_addr').insert({ip: ipInfo.ip, country:ipInfo.country});
    }
    const ipUserExist = await database.table('user_ip').select('*').where({ip: ipInfo.ip, username : username});
    if (ipUserExist.length === 0) {
      await database('user_ip').insert({username: username, ip: ipInfo.ip, verified: verified});
      console.log('Success insert user_ip !')
    }
  } catch (e) {
    console.error(e);
  }
}

const confirmIp = async (username, ip) => {
  await database('user_ip')
    .where({
      username: username,
      ip:  ip
    })
    .update({ verified: true })
    .then(() => console.log('Success verify !'))
    .catch(err => console.error(err));
}



module.exports = {
  isVerifiedIp,
  addToVerifiedIp,
  userExists,
  confirmIp,
}
