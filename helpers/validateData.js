const emailPattern = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
// passwordPattern comes from https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/

module.exports.isValidEmail = email => {
  if (!email) return false;

  if (email.length > 254) return false;

  // Checking of some things regex can't handle
  const parts = email.split("@");
  if (parts[0].length > 64) return false;

  const domainParts = parts[1].split(".");
  if (domainParts.some(part => part.length > 63)) return false;

  return emailPattern.test(email);
};

module.exports.isValidPassword = password => {
  if (!password) return false;

  return passwordPattern.test(password);
};
