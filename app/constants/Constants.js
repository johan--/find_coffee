var BASE_URL = process.env.SITE_URL || 'http://coffee.lyleblack.com';

module.exports = {
  BASE_URL:           BASE_URL,
  SIGNUP_URL:         BASE_URL + '/users/new',
  LOGIN_URL:          BASE_URL + '/login',
  NEW_SESSION_URL:    BASE_URL + '/sessions/new',
  LOGOUT_URL:         BASE_URL + '/logout',
  INSTAGRAM_URL:      BASE_URL + '/roasters/instagram/',
  TWITTER_URL:        BASE_URL + '/roasters/twitter/',
  WATCH_OFFERING_URL: BASE_URL + '/users/watch/?',
  FOLLOW_ROASTER_URL: BASE_URL + '/users/follow/?',
  USER_URL:           BASE_URL + '/users/',
  LOGIN_USER:         'LOGIN_USER',
  LOGOUT_USER:        'LOGOUT-USER',
  UPDATE_USER:        'UPDATE_USER',
  UPDATE_FLASH_MSG:   'UPDATE_FLASH_MSG'
};
