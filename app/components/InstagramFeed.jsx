/** @jsx React.DOM */
var React = require('react');

function runOnce(fn) {
  var hasRun = false;

  return function() {
    if (hasRun) return;
    hasRun = true;
    fn();
  };
}

module.exports = React.createClass({

  getInitialState: function() {
    return {
      current: 0,
      startInterval: runOnce(this.startCycle)
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

  startCycle: function() {
    setInterval(this.getNextPic, 5000);
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

  render: function() {
    this.state.startInterval();

    if (!this.props.pics) {
      return <div className="instagramFeed"></div>;
    }
    return this.getPic();
  }

});
