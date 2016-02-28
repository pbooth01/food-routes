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
  		return new RouteModel();
  	},

  	initializeFood: function(){
  		return new WayPoints();
  	},

  	updateWayPointInformation: function(index, options){
  		var wayPoints = this.state.route.get('WayPoints'),
  			route = wayPoints.at(index);
  		
  		route.set(options);
  		
  		this.setState({route: this.state.route});
  		vent.trigger('map:renderRoute');
  	},

  	updatePathInfo: function(data){
  		var route = this.state.route;

  		route.set(data);

  		this.setState({route: this.state.route});
  		console.log(this.state.route);
  	},

  	// Render the component
  	render: function(){
  		var mapService = this.props.mapService,
  			route = this.state.route,
  			updateRoute = this.updateWayPointInformation,
  			updatePath = this.updatePathInfo;
    	return (
    		<div className='application-wrapper'>
      			<Header/>
      			<Panel 
      				mapService={mapService} 
      				route={route}
      				updateRoute={updateRoute}/>
      			<Map 	
      				mapService={mapService} 
      				route={route}
      				updatePath={updatePath}/>
      		</div>
    	);
  	}
});
