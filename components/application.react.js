/** @jsx React.DOM */

var React = require('react'),
	WayPoints = require('../public/js/models/way-points'),
	RouteModel = require('../public/js/models/route'),
	RouteCollection = require('../public/js/models/routes'),
	Header = require ('./header.react'),
	Panel = require ('./panel.react'),
	Map = require ('./map.react');

// Export the Application component
module.exports = Application = React.createClass({

	getInitialState: function() {
    	return {
    		route: this.initializeRoute(),
    		foodDestinations: this.initializeFood() 
    	};
  	},

  	initializeRoute: function(){
  		return new RouteModel({
  			name: 'Route name',
  			WayPoints: new WayPoints([
  				{name: "start"},
  				{name: "end"}
  			])
  		})
  	},

  	initializeFood: function(){
  		return new WayPoints();
  	},

  	// Render the component
  	render: function(){
  		var mapService = this.props.mapService,
  			route = this.state.route;
    	return (
    		<div className='application-wrapper'>
      			<Header/>
      			<Panel mapService={mapService} route={route}/>
      			<Map mapService={mapService} route={route}/>
      		</div>
    	);
  	}
});
