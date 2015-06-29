/** @jsx React.DOM */
var React        = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    CoffeeForm   = require('./CoffeeForm.jsx'),
    utils        = require('../../lib/utils.js');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      offerings: this.props.data.offerings
    };
  },

  handleSubmit: function(values) {

    // Handle form submit if rendering on client.
    if (typeof window !== 'undefined') {

      // Use offerings from props for full list.
      var Filter    = new utils.Filter(this.props.data.offerings),
          available = Filter.processForm(values);

      this.setState({offerings: available});

    // Handle form submit if rendering on client.
    } else {
      $.ajax({
        url : "https://localhost:8000/offerings/find",
        type: "POST",
        contentType: 'application/json',
        data : JSON.stringify(values),

        success: function(data, textStatus, jqXHR) {
          this.setState({ offerings: JSON.parse(data) })
        }.bind(this),

        error: function (jqXHR, textStatus, error) {
          console.error(error);
        }
      });
    }
  },

  render: function() {
    return (
      <div>
        <CoffeeForm {...this.props} handleSubmit={this.handleSubmit} />
        <RouteHandler perPage={10} offerings={this.state.offerings} />
      </div>
    );
  }

});
