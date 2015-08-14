/** @jsx React.DOM */
var React = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    Header = require('./Header.jsx'),
    AuthService = require('../services/AuthService.js'),
    LoginStore = require('../stores/LoginStore.js'),
    LoginActions = require('../actions/LoginActions.js'),
    FlashMessage = require('./FlashMessage.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return this.getStore();
  },

  getStore: function() {
    return {
      user: LoginStore.getUser(),
      flashMsg: LoginStore.getFlashMsg()
    };
  },

  getFlashMessage: function() {
    var flashMsg = this.state.flashMsg;
    return flashMsg === null ?  { msg: null, type: null } : flashMsg;
  },

  componentDidMount: function() {
    this.changeListener = this.onChange,
    LoginStore.addChangeListener(this.changeListener);
  },

  componentWillUnmount: function() {
    LoginStore.removeChangeListener(this.changeListener);
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.isNewPage(this.props.path, nextProps.path)) {
      LoginActions.updateFlashMessage(null);
    }
  },

  isNewPage: function(current, next) {
    return current !== next;
  },

  onChange: function() {
    this.setState(this.getStore());
  },

  renderFlashMsg: function() {
    var flashMsg = this.state.flashMsg;
    if (flashMsg) {
      return <FlashMessage type={flashMsg.type} msg={flashMsg.msg} />;
    }
  },

  render: function() {
    var flashMsg = this.getFlashMessage();

    return (
        <div>
          <Header user={this.state.user} />
          {this.renderFlashMsg()}
          <section className="container">
            <RouteHandler {...this.props} user={this.state.user} />
          </section>
        </div>
    );
  }

});
