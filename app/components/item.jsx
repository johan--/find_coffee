/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      count: this.props.initialCount
    };
  },

  _increment: function() {
    this.setState({ count: this.state.count + 1});
  },

  render: function() {
    return (
        <div onClick={this._increment}>
          {this.state.count}
        </div>
        );
  }

});
