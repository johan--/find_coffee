/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      current: 0
    };
  },

  getPic: function() {
    var current = this.state.current,
        pics    = this.props.pics,
        pic     = pics[current];

    return (
      <div className="instagramFeed">
        <a href={pic.link}><img src={pic.images.low_resolution.url} /></a>
      </div>
    );
  },

  getNextPic: function() {
    var current = this.state.current,
        len     = this.props.pics.length;

    if (current === len - 1) {
      this.setState({ current: 0 });
    } else {
      this.setState({ current: ++current });
    }
  },

  componentDidMount: function() {
    this.interval = setInterval(this.getNextPic, 5000);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  hasLoaded: function() {
    return !!this.props.pics;
  },

  render: function() {
    if (this.hasLoaded()) {
      return this.getPic();
    }
    return <div className="instagramFeed"></div>;
  }

});
