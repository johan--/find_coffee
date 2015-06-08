/** @jsx React.DOM */
var React = require('react'),
    ReactPaginate = require('react-paginate'),
    OfferingListItem = require('./OfferingListItem.jsx');

var List = React.createClass({

  render: function() {
    var offerings    = this.props.offerings,
        allOfferings = [],
        self         = this;

    for (offering in offerings) {
      allOfferings.push(
        <OfferingListItem
          params={self.props.params}
          offering={offerings[offering]}
          key={offering}
        />
      );
    }

    return (
      <ul className="offeringsList">
        {allOfferings}
      </ul>
    );
  }
});

var OfferingsList = React.createClass({

  getInitialState: function() {
    var offerings = this.props.offerings,
        perPage   = this.props.perPage;

    return {
      offerings: offerings.slice(0, perPage),
      pageNum: (offerings.length / perPage)
    };
  },

  handlePageClick: function(data) {
    var offerings = this.props.offerings,
        perPage   = this.props.perPage,
        offset    = Math.ceil(data.selected * perPage);

    this.setState({ offerings: offerings.slice(offset, (offset + perPage)) });
  },

  render: function () {
    return (
      <div className="offerings">
        <List offerings={this.state.offerings} />
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<li className="break"><a href="">...</a></li>}
                       pageNum={this.state.pageNum}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages"}
                       activeClass={"active"} />
      </div>
    );
  }
});

module.exports = OfferingsList;
