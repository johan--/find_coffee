/** @jsx React.DOM */
var React = require('react'),
    ReactPaginate = require('react-paginate'),
    OfferingListItem = require('./OfferingListItem.jsx'),
    NotFound = require('./404.jsx');

var List = React.createClass({

  renderList: function() {
    var offerings = this.props.offerings,
        offeringsList = [],
        self = this;

    offerings.forEach(function(offering, index) {
      offeringsList.push(
        <OfferingListItem params={self.props.params}
                          offering={offering}
                          handleClick={self.props.handleClick}
                          removeButton={self.props.removeButton}
                          hideRoaster={self.props.hideRoaster}
                          key={index} />
      );
    });

    return offeringsList;
  },

  render: function() {
    return <ul className="list">{this.renderList()}</ul>;
  }
});

var OfferingsList = React.createClass({

  getDefaultProps: function() {
    return {
      msg: 'Oh no! Looks like nothing matched that search criteria.'
    };
  },

  getInitialState: function() {
    return this.getInitial();
  },

  getInitial: function(newProps) {
    var offerings = (newProps && newProps.offerings) || this.props.offerings,
        perPage   = this.props.perPage;

    return {
      offerings: offerings.slice(0, perPage),
      pageNum: (offerings.length / perPage),
      selected: 0
    };
  },

  getButtons: function() {
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

  componentWillReceiveProps: function(newProps) {
    this.setState(this.getInitial(newProps));
  },

  handleListClick: function(info) {
    this.props.handleClick(info);
  },

  handlePaginationClick: function(data) {
    var offerings = this.props.offerings,
        perPage   = this.props.perPage,
        selected  = data.selected,
        offset    = Math.ceil(selected * perPage);

    this.setState({
      offerings: offerings.slice(offset, (offset + perPage)),
      selected: selected
    });
  },

  hasNoMatches: function() {
    return !this.state.offerings.length;
  },

  renderNotFound: function() {
    return <NotFound className="col-xs-12 col-sm-7 offerings" msg={this.props.msg} />;
  },

  renderFound: function() {
    return (
      <div className="col-xs-12 col-sm-7 offerings">
        <List hideRoaster={this.props.hideRoaster}
              removeButton={this.props.removeButton}
              handleClick={this.handleListClick}
              offerings={this.state.offerings} />
        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<li className="break"><a href="">...</a></li>}
                       buttons={this.getButtons()}
                       pageNum={this.state.pageNum}
                       marginPagesDisplayed={1}
                       pageRangeDisplayed={1}
                       clickCallback={this.handlePaginationClick}
                       forceSelected={this.state.selected}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages"}
                       activeClass={"active"} />
      </div>
    );
  },

  render: function () {
    if (this.hasNoMatches()) {
      return this.renderNotFound();
    } else {
      return this.renderFound();
    }
  }
});

module.exports = OfferingsList;
