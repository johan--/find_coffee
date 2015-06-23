/** @jsx React.DOM */
var React         = require('react'),
    Router        = require('react-router'),
    App           = require('./components/App.jsx'),
    Home          = require('./components/Home.jsx'),
    OfferingList  = require('./components/OfferingList.jsx'),
    Offering      = require('./components/Offering.jsx'),
    Offerings     = require('./components/Offerings.jsx'),
    Offering404   = require('./components/Offering404.jsx'),
    Admin         = require('./components/Admin.jsx'),
    Login         = require('./components/Login.jsx'),
    Signup        = require('./components/Signup.jsx'),
    NotFound      = require('./components/404.jsx'),
    Route         = Router.Route,
    DefaultRoute  = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute;

module.exports = [
  <Route handler={App}>

    <DefaultRoute name="home" handler={Home} />

    <Route name="offerings" handler={Offerings} >
      <DefaultRoute name="list" handler={OfferingList} />
      <Route name="offering" path=":_id" handler={Offering} />
      <NotFoundRoute handler={Offering404} />
    </Route>

    <Route name="login" handler={Login} />
    <Route name="signup" handler={Signup} />
    <Route name="admin" handler={Admin} />

    <NotFoundRoute handler={NotFound} />

  </Route>
];
