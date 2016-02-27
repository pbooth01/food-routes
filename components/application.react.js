/** @jsx React.DOM */

var React = require('react'),
	vent = require('../public/js/utilities/vent'),
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
  		});
  	},

  	initializeFood: function(){
  		return new WayPoints();
  	},

  	updateRouteInformation: function(index, options){
  		var wayPoints = this.state.route.get('WayPoints'),
  			route = wayPoints.at(index);

  		for(prop in options){
  			route.set(prop, options[prop]);
  		}

  		this.setState({route: this.state.route});
  		vent.trigger('map:renderRoute');
  	},

  	// Render the component
  	render: function(){
  		var mapService = this.props.mapService,
  			route = this.state.route,
  			updateRoute = this.updateRouteInformation;
    	return (
    		<div className='application-wrapper'>
      			<Header/>
      			<Panel 
      				mapService={mapService} 
      				route={route}
      				updateRoute={updateRoute}/>
      			<Map mapService={mapService} route={route}/>
      		</div>
    	);
  	}
});
