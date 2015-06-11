/** @jsx React.DOM */
var React        = require('react'),
    RouteHandler = require('react-router').RouteHandler,
    CoffeeForm   = require('./CoffeeForm.jsx'),
    utils        = require('../../lib/utils.js');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      offerings: this.props.offerings
    };
  },

  handleSubmit: function(values) {

    // Handle form submit if rendering on client.
    if (typeof window !== 'undefined') {

      // Use offerings from props for full list.
      var offerings = this.props.offerings,
          Available = new utils.Available(offerings);

      // Filter offerings based on form values.
      Available.filter('ALL', values.search)
               .filter('blend', values.blend)
               .filter('decaf', values.decaf)
               .filter('direct', values.direct)
               .filter('organic', values.organic)
               .filter('origin', values.origin)
               .filter('process', values.process)
               .filter('roaster', values.roaster);

      this.setState({offerings: Available.offerings});

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
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(errorThrown);
        }
      });
    }
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
