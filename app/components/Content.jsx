/** @jsx React.DOM */

var React      = require('react'),
    OfferingList = require('./OfferingList.jsx');
    CoffeeForm = require('./CoffeeForm.jsx');

module.exports = React.createClass({

  render: function() {

    if (this.props.homePage) {
      var msg = 'Search the newest coffees from the best roasters ' +
                'all over the country.'
      var greeting = <h3>{msg}</h3>;
    }

    return (
      <section id="mainContent">
        {greeting}
        <OfferingList offerings={this.props.offerings} />
      </section>
    );
  }
});
