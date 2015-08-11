/** @jsx React.DOM */
var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    CoffeeForm = require('./CoffeeForm.jsx'),
    Filter = require('../../lib/utils.js').Filter;

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

    // If currently on /offering/:id, will need to redirect to
    // /offerings in order to view list.
    if (path !== '/offerings') {
      this.transitionTo('/offerings');
    }

    this.setState({
      offerings: self.getFilteredOfferings(formInputs),
      isInitialLoad: false
    });
  },

  render: function() {
    return (
      <div className="row offeringsPage">
        <RouteHandler {...this.props}
                      perPage={10}
                      offerings={this.getOfferings()} />
        <CoffeeForm {...this.props}
                    handleSubmit={this.handleSubmit} />
      </div>
    );
  }

});
