/** @jsx React.DOM */

var React = require('react');

module.exports = PanelHeader = React.createClass({

  // Render the component
  render: function(){
  	var routeName = this.props.routeName;
    return (
      <div className="panel-header">
      	<h2> {routeName} </h2>
      </div>
    )
  }

});