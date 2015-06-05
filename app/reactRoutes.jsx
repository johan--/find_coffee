/** @jsx React.DOM */
var React         = require('react'),
    Router        = require('react-router'),
    App           = require('./components/App.jsx'),
    OfferingList  = require('./components/OfferingList.jsx'),
    NotFound      = require('./components/404.jsx'),
    Route         = Router.Route,
    DefaultRoute  = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute;

module.exports = [
  <Route handler={App} path="/" >
    <DefaultRoute name="list" handler={OfferingList} />
    <NotFoundRoute handler={NotFound} />
  </Route>
];
