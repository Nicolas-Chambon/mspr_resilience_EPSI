const database = require('../database');
const sendEmail = require('../utils/aws-ses');

const isVerifiedNav = async (username, navigator) => {
  return await database.select('*')
    .from('user_navigator')
    .where({username: username, navigator: navigator})
    .then(data => {
      return data.length > 0 ? data[0].verified : false;
    }).catch((err) => {
      return err;
    });
}

const addToVerifiedNav = async (username, email, navigator) => {
  sendEmail([email], "Navigateur Inconnu",
    "<body>" +
    "<p>Une nouvelle connexion a été détectée à partir de ce navigateur, veuillez confirmer que c'est bien vous en cliquant sur ce lien: "
    + "<a href="+ process.env.API_URL + "/confirm-nav/" + "?user=" + username + "&navigator=" + navigator + ">"
    + "Lien de confirmation" + "</a>"
    + "</p>" +
    "</body>"
  );
  try {
    const navExists = await database.table('navigator').select('*').where({navigator: navigator});
    if (navExists.length === 0) {
      await database.table('navigator').insert({navigator: navigator});
    }
    const navUserExists = await database.table('user_navigator').select('*').where({navigator: navigator, username : username});
    if (navUserExists.length === 0) {
      await database('user_navigator').insert({username: username, navigator: navigator, verified : false});
      console.log('Success insert user_navigator !')
    }

  } catch (e) {
    console.error(e);
  }
}

const confirmNav = async (username, navigator) => {

  await database('user_navigator')
    .where({
      username: username,
      navigator:  navigator
    })
    .update({ verified: true })
    .then(() => console.log('Success verify navigator !'))
    .catch(err => console.error(err))

}


module.exports = {
  isVerifiedNav,
  addToVerifiedNav,
  confirmNav
}
