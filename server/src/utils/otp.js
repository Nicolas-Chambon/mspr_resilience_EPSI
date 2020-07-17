const speakeasy = require('speakeasy');
const { getUserOtpSecret } = require("./user-management");

const generateOtpToken = async (user) => {
  try {
    const secretKey = await getUserOtpSecret(user);
    console.log('secretKey : ', secretKey);
    const token = speakeasy.totp({
      secret: secretKey,
      encoding: "base32"
    });
    console.log('OTP Token : ', token)
    return token;
  } catch (e) {
    console.error(e);
    return null;
  }
}

const verifyOtp = async (user, token) => {
  const secretKey = await getUserOtpSecret(user);
  const verified = await speakeasy.totp.verify({
    secret: secretKey,
    encoding: "base32",
    token: token,
    window: 10
  });
  console.log('verifyOtp variables : [user : ' + user + ', secretKey : ' + secretKey + ', token : ' + token + ', verified : ' + verified + ']');
  return verified;
}

module.exports = {
  verifyOtp,
  generateOtpToken,
};



