var BASE_URL = 'https://localhost:8000';

module.exports = {
  BASE_URL:    BASE_URL,
  SIGNUP_URL:  BASE_URL + '/users/new',
  LOGIN_URL:   BASE_URL + '/sessions/new',
  LOGOUT_URL:  BASE_URL + '/logout',
  LOGIN_USER:  'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT-USER',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_FLASH_MSG: 'UPDATE_FLASH_MSG'
};
