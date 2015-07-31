/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({

  getInitialState: function() {
    return { roaster: 'Any', origin: 'Any', process: 'Any' };
  },

  getFormValues: function() {
    return {
      search:  this.refs.search.getDOMNode().value,
      origin:  this.refs.origin.getDOMNode().value,
      roaster: this.refs.roaster.getDOMNode().value,
      process: this.refs.process.getDOMNode().value,
      blend:   this.refs.blend.getDOMNode().checked,
      decaf:   this.refs.decaf.getDOMNode().checked,
      organic: this.refs.organic.getDOMNode().checked,
      direct:  this.refs.direct.getDOMNode().checked,
    };
  },

  handleSelectChange: function(e) {
    var updatedState = {};
    updatedState[e.target.id] = e.target.value;
    this.setState(updatedState);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.props.handleSubmit(this.getFormValues());
  },

  renderTextInput: function(name, label) {
    return (
      <input
        ref={name}
        className="textbox"
        type="text"
        name={name}
        placeholder={label}>
      </input>
    );
  },

  renderCheckbox: function(name, value) {
    return (
      <div className="form-group">
        {this.renderLabel(name, value)}
        <input id={name}
          type="checkbox"
          name={name}
          ref={name} />
      </div>
    );
  },

  renderSubmit: function(label) {
    return (
      <input className="submit"
             type="submit"
             ref="submit"
             value={label} />
      );
  },

  renderSelect: function(id, label, values) {
    var options = values.map(function(value) {
      return <option key={value} value={value}>{value}</option>
    });

    return (
      <div className="form-group">
        {this.renderLabel(id, label)}
        <select
          onChange={this.handleSelectChange}
          ref={id}
          value={this.state.value}
          id={id}>
          {options}
        </select>
      </div>
    );
  },

  renderLabel: function(id, label) {
    return <label htmlFor={id}>{label}</label>;
  },

  renderCheckboxes: function() {
    return (
      <div className="checkboxes">
        {this.renderCheckbox('blend', 'Blend')}
        {this.renderCheckbox('decaf', 'Decaf')}
        {this.renderCheckbox('organic', 'Organic')}
        {this.renderCheckbox('direct', 'Direct Trade')}
      </div>
    );
  },

  render: function() {
    return (
        <form className="col-xs-12 offeringsForm" onSubmit={this.handleSubmit} >
          {this.renderTextInput('search', 'Search flavors...')}
          {this.renderSelect('origin', 'Origin', this.props.data.uniqueOriginNames)}
          {this.renderSelect('roaster', 'Roaster', this.props.data.uniqueRoasterNames)}
          {this.renderSelect('process', 'Process', this.props.data.processes)}
          {this.renderCheckboxes()}
          {this.renderSubmit('Find coffee')}
        </form>
     );
  }
});
