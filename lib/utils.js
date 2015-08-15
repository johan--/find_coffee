// Ensure valid email format.
function validEmail(email) {
  if (!email) return false;

  var trimmedEmail = email.trim(),
      RE = /^[\w\d]+@[\w\d\.]+[^\.]$/; // foo@bar.com || foo@bar.baz.com

  return typeof trimmedEmail === 'string' && trimmedEmail.match(RE);
}

// Ensure username or password is certail length.
function validateString(string, minLength) {
  return typeof string === 'string' && string.length >= minLength;
}

// Returns array of possible errors.
function validateInputs(formInputs) {
  var username = formInputs.username,
      password = formInputs.password,
      email    = formInputs.email,
      errors = [];

  if (!validateString(username, 4)) {
    errors.push({
      msg: 'Username must be a string with at least four characters.',
      type: 'username'
    });
  }

  if (!validateString(password, 6)) {
    errors.push({
      msg: 'Password must be at least 6 characters.',
      type: 'password'
    });
  }

  if (!validEmail(email)) {
    errors.push({
      msg: 'Email must be in a traditional format. e.g., \'foo@bar.com\'',
      type: 'email'
    });
  }

  return { errors: errors, failed: !!errors.length };
}

module.exports = validateInputs;
