/** @jsx React.DOM */
var React        = require('react'),
    Router       = require('react-router'),
    RouteHandler = Router.RouteHandler,
    CoffeeForm   = require('./CoffeeForm.jsx'),
    Filter       = require('../../lib/utils.js').Filter;

module.exports = React.createClass({
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {
    return {
      isInitialLoad: true,
      offerings: null
    };
  },

  getOfferings: function() {
    return this.state.isInitialLoad ? this.props.data.offerings : this.state.offerings;
  },

  getFilteredOfferings: function(inputs) {
    var filter = new Filter(this.props.data.offerings);
    return filter.processForm(inputs);
  },

  handleSubmit: function(formInputs) {
    var path = this.getPath(), self = this;

    // Need to redirect to '/offerings' if currently viewing offering.
    if (path !== '/offerings') {
      this.transitionTo('/offerings');
    }

    // Handle form submit if rendering on client.
    if (typeof window !== 'undefined') {
      this.setState({
        offerings: self.getFilteredOfferings(formInputs),
        isInitialLoad: false
      });

    // Handle form submit if rendering on client.
    } else {
      $.ajax({
        url: "https://localhost:8000/offerings/find",
        type: "POST",
        contentType: 'application/json',
        data: JSON.stringify(formInputs),

        success: function(data, textStatus, jqXHR) {
          this.setState({
            offerings: JSON.parse(data),
            isInitialLoad: false
          })
        }.bind(this),

        error: function (jqXHR, textStatus, err) {
          console.error(err);
        }
      });
    }
  },

  render: function() {
    return (
      <div>
        <CoffeeForm {...this.props} handleSubmit={this.handleSubmit} />
        <RouteHandler perPage={10} offerings={this.getOfferings()} />
      </div>
    );
  }

});
