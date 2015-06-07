/** @jsx React.DOM */
var React = require('react');

var origins  = ['panama', 'guat', 'nyc'],
    roasters = ['halfwit', 'intelli', 'mtrop'],
    process  = ['natural', 'washed'];

module.exports = React.createClass({

  getInitialState: function() {
    return {
      origin:  origins[0],
      roaster: roasters[0],
      process: process[0],
    };
  },

  handleChange: function(e) {
    var state = {};
    state[e.target.id] = e.target.value;
    this.setState(state);
  },

  render: function() {
    return (
        <form>
          {this.renderTextInput('flavor', 'Search flavors...')}
          {this.renderSelect('origin', 'Origin', origins)}
          {this.renderSelect('roaster', 'Roaster', roasters)}
          {this.renderSelect('process', 'Process', process)}
          {this.renderCheckbox('blend', 'Blend')}
          {this.renderCheckbox('decaf', 'Decaf')}
          {this.renderCheckbox('organic', 'Organic')}
          {this.renderCheckbox('dirTrade', 'Direct Trade')}
          {this.renderSubmit('Find Coffee')}
        </form>
     );
  },

  renderTextInput: function(name, label) {
    return (
      <input className="textbox" type="text" name={name} placeholder={label}></input>
    );
  },

  renderCheckbox: function(name, value) {
    return (
      <input className="checkbox" type="checkbox" name={name} value={value}>
        {value}
      </input>
    );
  },

  renderSubmit: function(label) {
    return <input className="submit" type="submit" value={label}></input>;
  },

  renderSelect: function(id, label, values) {
    var options = values.map(function(value) {
      return <option key={value} value={value}>{value}</option>
    });

    return (
      <div className="formGroup">
        {this.renderLabel(id, label)}
        <select onChange={this.handleChange} value={this.state.value} id={id}>
          {options}
        </select>
      </div>
    );
  },

  renderLabel: function(id, label) {
    return <label htmlFor={id}>{label}</label>;
  }
});
