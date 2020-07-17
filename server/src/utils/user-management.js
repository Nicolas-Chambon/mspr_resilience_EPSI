const database = require('../database');
const speakeasy = require("speakeasy");

const userExists = async (username) => {
  return await database.select('email_contact')
    .from('users')
    .where({username: username})
    .then(data => {
      console.log(data);
      return data.length > 0 ? data[0].email_contact : null;
    }).catch((err) => {
      console.error(err);
    });
}

const addOtpSecretToUser = async (username) => {
  try {
    const secretKey = speakeasy.generateSecret({length: 20}).base32;
    console.log('speakeasy : ', secretKey);
    const secret = await database.table('users')
                                .where({username: username})
                                .update({otp_secret: secretKey});
    console.log('addOtpSecretToUser(): ', secret);
  } catch (e) {
    console.error(e);
  }
}

const addToUsers = async (username) => {
  const contact = username + '@epsi.fr';
  try {
    await database.table('users').insert({username: username, email_contact: contact});
    await addOtpSecretToUser(username);
    console.log('addToUsers() && generateOtpSecret(): ', await getUserOtpSecret(username));
    return contact;
  } catch (e) {
    console.error(e);
  }
}

const getUserEmail = async (username) => {
  try{
    const data = await database.table('users').select('email_contact').where({username: username})
    if (data[0]){
      return data[0].email_contact
    }
    else {
      return username+'@epsi.fr';
    }
  }
  catch (e) {
    console.error(e)
  }
}

const getUserOtpSecret = async (username) => {
  try {
    const secret = await database.from('users').select('otp_secret').where({username: username});
    console.log('getUserOtpSecret(): ', secret[0].otp_secret);
    return secret[0].otp_secret;
  } catch (e) {
    console.error(e);
    return null;
  }
}


module.exports = {
  userExists,
  addToUsers,
  addOtpSecretToUser,
  getUserOtpSecret,
  getUserEmail
};
