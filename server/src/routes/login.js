const express = require('express');
const router = express.Router();
const sendMail = require('../utils/aws-ses');
const { generateOtpSecret, generateOtpToken, verifyOtp } = require('../utils/otp');
const { isVerifiedIp, addToVerifiedIp } = require('../utils/ip-management');
const { isVerifiedNav, addToVerifiedNav } = require('../utils/nav-management');
const { adAuthentication } = require('../utils/active-directory');
const { userExists, addToUsers, getUserEmail } = require('../utils/user-management');
const {haveIBeenPwnedV2, getHibpContent} = require ('../utils/have-i-been-pwnd')

router.post("/login", async (req, res) => {
  const { username, password, navigator } = req.body;
  const { ip, country } = req.ipInfo;
  let email;
  let confirm = null;

  let responseAD;

  responseAD = adAuthentication(username, password, function (auth) {
    if (!auth){
      res.status(400).json({error : "Identifiant ou mot de passe érroné"})

    }
  })

  if (!username || !password || !navigator) {
    res.status(400).json({ error: "Missing username or password." });
  } else {
    try {
      // Gestion ad

      const checkAD = await adAuthentication(username, password)

      if (!checkAD){
        res.status(200).json({error : 'Identifiant ou mot de passe invalide'})
      }
      else{
        //Gestion BDD
        const _user = await userExists(username);
        if (!_user) {
          email = await addToUsers(username);
        } else {
          email = _user;
        }
        const _ip = await isVerifiedIp(username, ip);
        const _navigator = await isVerifiedNav(username, navigator);
        if (!_ip) {
          await addToVerifiedIp(username, email, req.ipInfo);
          if (country !== 'FR') {
            confirm = 'Un email vous a été envoyé afin de confirmer votre adresse IP'
            sendMail([email], "Portail Résilience 34 - Confirmer adresse IP",
              "<body>"
              + "<p> Confirmer votre nouvelle adresse ip en cliquant sur ce lien : "
              + "<a href="+ process.env.API_URL + "/confirm-ip/" + "?user=" + username + "&ip=" + ip + "&country=" + country + ">"
              + "Lien de confirmation" + "</a>"
              +  "</p>"
              + "</body>"
            );
          }
        }
        if (!_navigator) {
          if (confirm){
            confirm = confirm +" Ainsi qu'un email de confirmation pour votre navigateur"
          }
          else {
            confirm = "Un email vous a été envoyé afin de confirmer votre navigateur"
          }
          await addToVerifiedNav(username, email, navigator);
        }
        if (confirm) {
          res.status(201).json(confirm);
        }

        const otpToken = await generateOtpToken(username);
        sendMail([email], "Portail Résilience 34 - One time password",
          "<body>" +
          "<p>Veuillez entrer ce mot de passe : " + otpToken + "</p>" +
          "</body>"
        );


        const hibp = await haveIBeenPwnedV2(email);
        if (hibp.length > 0){
          sendMail([email], "Portail Résilience 34 - Breaches detected",
            "<h3> breaches details : </h3>" + getHibpContent(hibp)

          );
          res.status(200).json(hibp);
        }

        res.status(200).end();
      }

    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Bad Request !" });
    }
  }
});

router.post("/otp", async (req, res) => {
  const {username, token} = req.body;
  console.log(req.body);
  if (!username || !token) {
    res.sendStatus(200).json({
      error: "Token missing"
    });
  } else {
    try {
      const verified = await verifyOtp(username, token);
      if (verified) {
        res.status(200).json('Bearer JWTtokenAuthenticationCommingSoon');
      } else {
        res.status(200).json({ error: "Invalid token please try again" });
      }
    } catch (e) {
      console.error(e);
      res.status(400).json({ error: "Bad Request !" });
    }
  }
});

router.get("/hibp/:username", async (req, res) => {
  const username = req.params.username;
  try{
    const email = await getUserEmail(username);
    const data = await haveIBeenPwnedV2(email);
    if (data.length > 0){
      sendMail([email], "Portail Résilience 34 - Breaches detected",
        "<h3> breaches details : </h3>" + getHibpContent(data)
      );
    }
    console.log("hibp", data);
    res.status(200).json(data);
  }
  catch (e) {
    console.error(e)
    res.status(200).json({error : e});
  }
});

module.exports = router;
