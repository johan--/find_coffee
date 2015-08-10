/** @jsx React.DOM */
var React = require('react'),
    request = require('request'),
    moment = require('moment');

module.exports = React.createClass({

  getInitialState: function() {
    var pics = this.props.isRenderingOnServer ? null : this.checkForCurrentPics();
    return { current: 0, pics: pics };
  },

  getPicsFromInstagram: function() {
    var url  = 'https://localhost:8000/roasters/instagram/',
        _id  = this.props._id,
        self = this;

    request(url + _id, function(err, res, body) {
      if (err) return self.setState({ pics: 'ERR_WHILE_LOADING' });

      if (res.statusCode < 400) {
        var pics = JSON.parse(res.body);
        self.setState({ pics: pics });
        self.setPicsOnLocalStorage(pics);
      }
    });
  },

  getPicsFromLocalStorage: function() {
    return JSON.parse(localStorage.getItem('PICS_' + this.props._id));
  },

  setPicsOnLocalStorage: function(pics) {
    var toStore = { pics: pics, lastUpdated: moment() };
    localStorage.setItem('PICS_' + this.props._id, JSON.stringify(toStore));
  },

  getCurrentPic: function() {
    return this.state.pics[this.state.current];
  },

  componentWillMount: function() {
    if (!this.props.isRenderingOnServer) {
      if (!this.hasLoaded()) {
        this.getPicsFromInstagram();
      }
    }
  },

  componentDidMount: function() {
    this.interval = setInterval(this.moveToNextPhoto, 5000);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  checkForCurrentPics: function() {
    var pics = this.getPicsFromLocalStorage();

    if (pics && this.isFromToday(pics.lastUpdated)) {
      return pics.pics;
    } else {
      return null;
    }
  },

  moveToNextPhoto: function() {
    var current = this.state.current,
        pics = this.state.pics,
        len;

    if (pics) {
      len = pics.length;

      if (current === len - 1) {
        this.setState({ current: 0 });
      } else {
        this.setState({ current: ++current });
      }
    }
  },

  isFromToday: function(date) {
    return moment(date) >= moment().startOf('day');
  },

  hasLoaded: function() {
    return !!this.state.pics;
  },

  hadErrorWhileLoading: function() {
    return this.state.pics === 'ERR_WHILE_LOADING';
  },

  renderLoading: function() {
    return <p>Loading...</p>;
  },

  renderError: function() {
    return (
      <p>An error occured while fetching photos.
        <button className="btn" onClick={this.getPicsFromInstagram}>
          Try again.
        </button>
      </p>
    );
  },

  renderPic: function() {
    var pic = this.getCurrentPic();
    return <a className="text-center" href={pic.link}><img src={pic.images.low_resolution.url} /></a>;
  },

  render: function() {
    var content;

    if (this.hadErrorWhileLoading()) {
      content = this.renderError();
    } else {
      content = this.hasLoaded() ? this.renderPic() : this.renderLoading();
    }

    return (
      <div className="text-center instagramFeed">
        <h2>Latest Instagram photos</h2>
        {content}
      </div>
    );
  }

});
