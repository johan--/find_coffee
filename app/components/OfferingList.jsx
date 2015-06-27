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
    return this._loadInitial();
  },

  componentWillReceiveProps: function(newProps) {
    this.setState(this._loadInitial(newProps));
  },

  _loadInitial: function(newProps) {
    var offerings = (newProps && newProps.offerings) || this.props.offerings,
        perPage   = this.props.perPage;

    return {
      offerings: offerings.slice(0, perPage),
      pageNum: (offerings.length / perPage),
      selected: 0
    };
  },

  handlePageClick: function(data) {
    var offerings = this.props.offerings,
        perPage   = this.props.perPage,
        selected  = data.selected,
        offset    = Math.ceil(selected * perPage);

    this.setState({
      offerings: offerings.slice(offset, (offset + perPage)),
      selected: selected
    });
  },

  _getButtons: function() {
    var lastPage  = Math.ceil(this.props.offerings.length / this.props.perPage),
        selected  = this.state.selected,
        buttons   = { previous: true, next: true };

    if (selected === 0) {
      buttons.previous = false;
    }

    if (selected === lastPage - 1) {
      buttons.next = false;
    }

    return buttons;
  },

  render: function () {
    return (
      <div className="offerings">
        <List offerings={this.state.offerings} />
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<li className="break"><a href="">...</a></li>}
                       buttons={this._getButtons()}
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
