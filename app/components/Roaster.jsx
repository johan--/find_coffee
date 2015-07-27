/** @jsx React.DOM */
var React         = require('react'),
    Router        = require('react-router'),
    mongoose      = require('mongoose'),
    InstagramFeed = require('./InstagramFeed.jsx'),
    TwitterFeed   = require('./TwitterFeed.jsx'),
    OfferingList  = require('./OfferingList.jsx'),
    RouteHandler  = Router.RouteHandler;

module.exports = React.createClass({
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    return {
      roaster:   {},
      offerings: []
    };
  },

  setOfferings: function() {
    var offerings = [],
        self = this;

    this.props.data.offerings.forEach(function(offering) {
      if (offering.roastery._id === self.state.roaster._id) {
        offerings.push(offering);
      }
    });

    this.setState({ offerings: offerings });
  },

  setRoaster: function(_id) {
    var roasters = this.props.data.roasters;

    for (var i = 0, len = roasters.length; i < len; i++) {
      if (roasters[i]._id === _id) {
        return this.setState({ roaster: roasters[i] });
      }
    }
    this.setState({ roaster: {notFound: true} });
  },

  componentWillMount: function() {
    var _id = this.props.params._id, self = this;

    this.setRoaster(_id);

    setTimeout(function() {
      if (self.hasLoaded()) {
        self.setOfferings();
      }
    }, 0);
  },

  isLoading: function() {
    return Object.keys(this.state.roaster).length === 0;
  },

  isFound: function() {
    return !this.state.roaster.notFound;
  },

  hasLoaded: function() {
    return this.isFound() && !this.isLoading();
  },

  hasLoadedOfferings: function() {
    return this.state.offerings.length;
  },

  renderOfferingsList: function() {
    if (this.hasLoadedOfferings()) {
      return <OfferingList hideRoaster={true}
                           perPage={10}
                           offerings={this.state.offerings} />;
    } else {
      return <div></div>;
    }
  },

  renderAddress: function() {
    var roaster = this.state.roaster;

    return (
      <ul className="roasterAddress">
        <li>{roaster.address}</li>
        <li>{roaster.city}, {roaster.state} {roaster.zip}</li>
      </ul>
    );
  },

  renderFound: function() {
    var _id = this.props.params._id;

    return (
      <div className="roasterPage">
        <div className="roasterProfile">
          <h1>{this.state.roaster.name}</h1>
          {this.renderAddress()}
          <h3>Current Offerings</h3>
          {this.renderOfferingsList()}
        </div>
        <div className="feeds">
          <InstagramFeed _id={_id} />
          <TwitterFeed _id={_id} />
        </div>
      </div>
    );
  },

  renderNotFound: function() {
    return <h1>No roaster found in database.</h1>;
  },

  renderLoading: function() {
    return <h1>Loading...</h1>;
  },

  render: function() {

    // Handle loading.
    if (this.isLoading()) {
      return this.renderLoading();

    // Handle found or not found.
    } else {
      if (this.hasLoaded()) {
        return this.renderFound();
      } else {
        return this.renderNotFound();
      }
    }
  }

});
