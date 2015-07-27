/** @jsx React.DOM */
var React = require('react'),
    request = require('request');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      current: 0,
      pics: null
    };
  },

  getNextPic: function() {
    var current = this.state.current,
        len     = this.state.pics.length;

    if (current === len - 1) {
      this.setState({ current: 0 });
    } else {
      this.setState({ current: ++current });
    }
  },

  getPics: function() {
    var url  = 'https://localhost:8000/roasters/instagram/',
        _id  = this.props._id,
        self = this;

    request(url + _id, function(err, res, body) {
      if (err) throw err;
      if (res.statusCode < 400) {
        self.setState({ pics: JSON.parse(res.body) });
      }
    });
  },

  getCurrentPic: function() {
    return this.state.pics[this.state.current];
  },

  renderLoading: function() {
    return <p>Loading...</p>;
  },

  renderPic: function() {
    var pic = this.getCurrentPic();
    return <a href={pic.link}><img src={pic.images.low_resolution.url} /></a>;
  },

  componentWillMount: function() {
    this.getPics();
  },

  componentDidMount: function() {
    this.interval = setInterval(this.getNextPic, 5000);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  hasLoaded: function() {
    return !!this.state.pics;
  },

  render: function() {
    var content = this.hasLoaded() ? this.renderPic() : this.renderLoading();

    return (
      <div className="instagramFeed">
        {content}
      </div>
    );
  }

});
