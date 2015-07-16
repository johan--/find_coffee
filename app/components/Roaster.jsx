/** @jsx React.DOM */
var React         = require('react'),
    Router        = require('react-router'),
    mongoose      = require('mongoose'),
    InstagramFeed = require('./InstagramFeed.jsx'),
    RouteHandler  = Router.RouteHandler;

module.exports = React.createClass({
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    return {
      roaster: {},
      pics:    null,
      tweets:  null
    };
  },

  getPics: function() {
    var pics = this.state.pics,
        links = [];

    if (pics) {
      pics.forEach(function(pic) {
        links.push({ link: pic.link, user: pic.user.username });
      });
    }

    return links;
  },

  setRoasterOnServer: function(_id) {
    var Roastery = mongoose.model('Roastery'), self = this;

    Roastery.find({ _id: _id }, function(err, roasters) {
      if (err) throw err;
      self.setState({ roaster: roasters[0] });
    });
  },

  setRoasterOnClient: function(_id) {
    var roasters = this.props.data.roasters;

    for (var i = 0, len = roasters.length; i < len; i++) {
      if (roasters[i]._id === _id) {
        this.setState({ roaster: roasters[i] });
        break;
      }
    }
  },

  setTweets: function() {
    // TODO
  },

  setPics: function() {
    $.ajax({
      url: "https://localhost:8000/roasters/instagram",
      type: "POST",
      contentType: 'application/json',
      data: JSON.stringify({ _id: this.props.params._id }),

      success: function(data, textStatus, jqXHR) {
        this.setState({ pics: JSON.parse(data) });
      }.bind(this),

      error: function(jqXHR, textStatus, err) {
        console.error(err);
      }
    });
  },

  componentDidMount: function() {
    var _id = this.props.params._id;

    if (typeof window === 'undefined') {
      this.setRoasterOnServer.call(this, _id);
      this.setPics();
    } else {
      this.setRoasterOnClient.call(this, _id);
      this.setPics();
    }
  },

  hasLoaded: function() {
    return Object.keys(this.state.roaster).length !== 0;
  },

  render: function() {
    if (this.hasLoaded()) {
      return (
        <div>
          <h1>{this.state.roaster.name}</h1>
          <InstagramFeed pics={this.state.pics} />
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }

});
