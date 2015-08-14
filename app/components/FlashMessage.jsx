/** @jsx React.DOM */
var React = require('react'),
    LoginStore = require('../stores/LoginStore.js');

module.exports = React.createClass({

  getClasses: function() {
    return "flash " + this.props.type;
  },

  handleClick: function() {
    LoginStore.setFlashMsg(null);
    LoginStore.emitChange();
  },

  renderRemoveButton: function() {
    return <button className="btn"
                   type="button"
                   onClick={this.handleClick}>
            X
          </button>;
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
