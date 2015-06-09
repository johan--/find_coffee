/** @jsx React.DOM */
var React        = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    CoffeeForm   = require('./CoffeeForm.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      offerings: this.props.offerings
    };
  },

  handleSubmit: function(values) {
    $.ajax({
      url : "https://localhost:8000/offerings/find",
      type: "POST",
      contentType: 'application/json',
      data : JSON.stringify(values),
      success: function(data, textStatus, jqXHR) {
        // this.setState({ offerings: data })
      }.bind(this),
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(errorThrown);
      }
    });
  },

  render: function() {
    return (
      <div>
        <CoffeeForm handleSubmit={this.handleSubmit}  />
        <RouteHandler perPage={10} offerings={this.state.offerings} />
      </div>
    );
  }

});
