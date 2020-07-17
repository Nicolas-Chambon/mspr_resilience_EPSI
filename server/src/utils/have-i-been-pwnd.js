require('dotenv').config();
const { search, breach } = require('hibp');
//const sendMail = require('../utils/aws-ses');

const haveIBeenPwnedV2 = async (login) => {
  let infoBreaches = [];
  try {
    const data = await search(login, { apiKey: process.env.HIBP_API_KEY });
    if (data.breaches || data.pastes) {
      for (const item of data.breaches) {
        try {
          infoBreaches.push(await breach(item.Name));
        } catch (e) {
          console.error(e);
        }
      }
    }
    return infoBreaches;
  } catch (e) {
    console.error(e);
    return infoBreaches;
  }
}

const getHibpContent = (data) => {
  let content = '';
  for (const item of data) {
    content += `<p>
             <h4>Title : ${item.Name}</h4>
             <ul style="list-style-type: none">
               <li><strong>Nom de domaine :</strong> ${item.Domain}</li>
               <li><strong>Date de la faille :</strong> ${item.BreachDate}</li>
               <li><strong>Nombre de comptes piratés :</strong> ${item.PwnCount}</li>
               <li><strong>Descritpion :</strong> ${item.Description}</li>
             </ul>
            </p>`
  }
  return content;
};

/*haveIBeenPwnedV2('abderrahim96@live.it').then((data) => {
   console.log("hipb : ", data);
   const getContent = (data) => {
     let content = '';
     for (const item of data) {
       content += `<p>
             <h4>Title : ${item.Name}</h4>
             <ul style="list-style-type: none">
               <li><strong>Nom de domaine :</strong> ${item.Domain}</li>
               <li><strong>Date de la faille :</strong> ${item.BreachDate}</li>
               <li><strong>Nombre de comptes piratés :</strong> ${item.PwnCount}</li>
               <li><strong>Descritpion :</strong> ${item.Description}</li>
             </ul>
            </p>`
     }
     return content;
   };
  console.log("foreach : ", getContent(data));
  sendMail(["nicolas.chambon@epsi.fr"], "Portail Résilience 34 - Confirmer adresse IP",
    "<h3> Voici le détail des failles detecté sur votre email : </h3>" + getContent(data)
   );

 }).catch((e)=> {
   console.error(e)
 })*/

module.exports = {
  haveIBeenPwnedV2,
  getHibpContent
};
