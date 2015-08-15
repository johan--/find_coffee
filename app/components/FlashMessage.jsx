/** @jsx React.DOM */
var React = require('react'),
    LoginActions = require('../actions/LoginActions.js');

module.exports = React.createClass({

  getClasses: function() {
    return "flash " + this.props.type;
  },

  handleClick: function() {
    LoginActions.updateFlashMessage(null);
  },

  renderRemoveButton: function() {
    return <button type="button" onClick={this.handleClick}>X</button>;
  },

  render: function() {
    return (
      <div className={this.getClasses()}>
        <h3>{this.props.msg}</h3>
        {this.renderRemoveButton()}
      </div>
    );
  }

});
