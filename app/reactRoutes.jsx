/** @jsx React.DOM */
var React         = require('react'),
    Router        = require('react-router'),
    App           = require('./components/App.jsx'),
    Home          = require('./components/Home.jsx'),
    OfferingList  = require('./components/OfferingList.jsx'),
    Offering      = require('./components/Offering.jsx'),
    Offerings     = require('./components/Offerings.jsx'),
    Offering404   = require('./components/Offering404.jsx'),
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

    <NotFoundRoute handler={NotFound} />

  </Route>
];
