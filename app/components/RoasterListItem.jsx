/** @jsx React.DOM */
var React        = require('react'),
    Link         = require('react-router').Link;

module.exports = React.createClass({

  handleMouseOver: function(_id) {
    this.props.handleMouseOver(_id);
  },

  render: function() {
    var _id = this.props.roaster._id;

    return (
      <li>
        <Link to="roaster"
              onMouseOver={this.handleMouseOver.bind(this, _id)}
              params={{ _id: _id }}>
          {this.props.roaster.name}
        </Link>
      </li>
    );
  }

});
