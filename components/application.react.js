/** @jsx React.DOM */

var React = require('react'),
	Header = require ('./header.react'),
	Map = require ('./map.react');

// Export the Application component
module.exports = Application = React.createClass({

  // Render the component
  render: function(){
  	var mapService = this.props.mapService;
    return (
    	<div className='application-wrapper'>
      		<Header/>
      		<Map mapService={mapService}/>
      	</div>
    );
  }

});
