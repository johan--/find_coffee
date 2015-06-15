/** @jsx React.DOM */
var React = require('react');

// TODO: pull all current roasters/origins from db
var origins  = ['Any', 'panama', 'guat', 'nyc'],
    process  = ['Any', 'Washed', 'Honey', 'Natural'];

module.exports = React.createClass({

  getInitialState: function() {
    return {
      origin:  origins[0],
      process: process[0],
    };
  },

  handleSelectChange: function(e) {
    var state = {};
    state[e.target.id] = e.target.value;
    this.setState(state);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.props.handleSubmit(this.getFormValues());
  },

  getFormValues: function() {
    var values = {
      search:  this.refs.search.getDOMNode().value,
      origin:  this.refs.origin.getDOMNode().value,
      roaster: this.refs.roaster.getDOMNode().value,
      process: this.refs.process.getDOMNode().value,
      blend:   this.refs.blend.getDOMNode().checked,
      decaf:   this.refs.decaf.getDOMNode().checked,
      organic: this.refs.organic.getDOMNode().checked,
      direct:  this.refs.direct.getDOMNode().checked,
    };
    return values;
  },

  render: function() {
    return (
        <form onSubmit={this.handleSubmit} >
          {this.renderTextInput('search', 'Search flavors...')}
          {this.renderSelect('origin', 'Origin', origins)}
          {this.renderSelect('roaster', 'Roaster', this.props.roasters)}
          {this.renderSelect('process', 'Process', process)}
          {this.renderCheckbox('blend', 'Blend')}
          {this.renderCheckbox('decaf', 'Decaf')}
          {this.renderCheckbox('organic', 'Organic')}
          {this.renderCheckbox('direct', 'Direct Trade')}
          {this.renderSubmit('Find coffee')}
        </form>
     );
  },

  renderTextInput: function(name, label) {
    return (
      <input
        ref={name}
        id="textbox"
        type="text"
        name={name}
        placeholder={label}>
      </input>
    );
  },

  renderCheckbox: function(name, value) {
    return (
      <input id={name}
        className="checkbox"
        type="checkbox"
        name={name}
        ref={name}
        value={value}>
        {value}
      </input>
    );
  },

  renderSubmit: function(label) {
    return (
      <input className="submit" type="submit" ref="submit" value={label}></input>
      );
  },

  renderSelect: function(id, label, values) {
    var options = values.map(function(value) {
      return <option key={value} value={value}>{value}</option>
    });

    return (
      <div className="formGroup">
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
  }
});
