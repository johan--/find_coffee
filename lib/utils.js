var cheerio = require('cheerio');

function isRenderingOnServer() {
  return typeof window === 'undefined';
}

function getDecodedText(text) {

  // Use Cheerio
  if (isRenderingOnServer()) {
    var $ = cheerio.load('<h1>' + text + '</h1>');
    return $('h1').text();

  // Use Jquery
  } else {
    return window.$('<textarea />').html(text).text();
  }
}

// Ensure valid email format.
function validEmail(email) {
  if (!email) return false;

  var trimmedEmail = email.trim(),
      RE = /^[\w\d]+@[\w\d\.]+[^\.]$/; // foo@bar.com || foo@bar.baz.com

  return typeof trimmedEmail === 'string' && trimmedEmail.match(RE);
}

// Ensure username or password is certail length.
function validString(string, minLength) {
  return typeof string === 'string' && string.length >= minLength;
}

// Used to reject values that exist on the form but were left blank,
// not values that don't exist on form in the first place.
// e.g., email field on login page
function isDefined(value) {
  return typeof value !== 'undefined';
}

// Returns array of possible errors.
function validateInputs(formInputs) {
  var username = formInputs.username,
      password = formInputs.password,
      email    = formInputs.email,
      errors = [];

  if (isDefined(username) && !validString(username, 4)) {
    errors.push({
      msg: 'Username must be a string with at least four characters.',
      type: 'username'
    });
  }

  if (isDefined(password) && !validString(password, 6)) {
    errors.push({
      msg: 'Password must be at least 6 characters.',
      type: 'password'
    });
  }

  if (isDefined(email) && !validEmail(email)) {
    errors.push({
      msg: 'Email must be in a traditional format. e.g., \'foo@bar.com\'',
      type: 'email'
    });
  }

  return { errors: errors, failed: !!errors.length };
}

module.exports = {
  validateInputs: validateInputs,
  getDecodedText: getDecodedText
};
