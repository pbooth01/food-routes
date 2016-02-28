/** @jsx React.DOM */

var React = require('react'),
	_ = require('lodash'),
	Q = require('q'),
	vent = require('../public/js/utilities/vent'),
	Haversine = require ('../public/js/utilities/haversine'),
    WayPoints = require('../public/js/models/way-points');

var directionsDisplay,
    directionsService,
    placesService,
    DEFAULT_LOCATION,
    LatLng;

// Export the Application component
module.exports = Map = React.createClass({

	componentDidMount: function () {

		var google = this.props.mapService;

		directionsDisplay = new google.maps.DirectionsRenderer();
        directionsService = new google.maps.DirectionsService();

        /*Change this before release*/
        DEFAULT_LOCATION = new google.maps.LatLng(42.748485699999996, -71.05772569999999);
        
    	if ("geolocation" in navigator) {

    		var that = this;

  			navigator.geolocation.getCurrentPosition(function(position) {

  				var userCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  				that.renderMap({
            		zoom: 15,
            		center: userCoords,
            		disableDefaultUI:true
        		});
			});
		} else {
  			this.renderMap({
            		zoom: 15,
            		center: DEFAULT_LOCATION,
            		disableDefaultUI:true
        		});
		}	
		/*Setting up Event Handelers*/
		vent.on('map:renderRoute', this.renderRoute, this);		
    },

    renderRoute: function(){
    	var google = this.props.mapService,
    		wayPoints = this.props.route.get('WayPoints'),
    		midPoints = wayPoints.pluck('name').slice(1, wayPoints.length - 1),
    		WPrequestArray = midPoints.map(function(name){ return {location: name}}),
    		that = this;

    	var	directionsRequest = {
    			origin: wayPoints.at(0).get('name'),
    			destination: wayPoints.at(-1).get('name'),
    			travelMode: google.maps.DirectionsTravelMode.DRIVING,
    			waypoints: WPrequestArray
    		};

    	if(directionsRequest.origin !== 'start' && directionsRequest.destination !== 'end'){
	    	directionsService.route(
	  			directionsRequest,
	  			function(response, status){
	    			if (status == google.maps.DirectionsStatus.OK){
	      				directionsDisplay.setDirections(response);
	      				console.log(response);

	      				that.props.updatePath({
	      					overview_path: response.routes[0].overview_path,
	      					filtered_path: Haversine.distanceFilter(response.routes[0].overview_path)
	      				});
	      				
	    			}
	    			else
	      				alert("Unable to retrieve your route");
	  			}			
			);
    	}
    },

    renderFoodDestinations: function(){

    	var sleep = function sleep(milliseconds) {
  						var start = new Date().getTime();
  						for (var i = 0; i < 1e7; i++) {
    						if ((new Date().getTime() - start) > milliseconds){
      							break;
    						}
  						}
					};

    	var google = this.props.mapService,
    		service = new google.maps.places.PlacesService(this.map),
    		foodLatLngs = this.props.route.get('overview_path'),
    		promiseArray = _(foodLatLngs)
	    						.map(function(pos, index){
	    							console.log("request" + index);
	    							console.log(pos.lat());
	    							var df = Q.defer(),
	    								request = {
	    									keyword: 'Thai Food',
	    									location: pos,
	    									radius: '3000',
	    									type: 'restaurant'
	    								};

	    							if(index % 3 === 0)
	    								sleep((Math.random() * (4 - 1) + 1) * 800);

	  								/*service.nearbySearch(request, function(results, status){
	  									  if (status == google.maps.places.PlacesServiceStatus.OK) {
	  									  	console.log("search");
										    df.resolve(results);
										  }else{
										  	console.log('error' + status);
										  	df.resolve([]);
										  }
	  								});
	    						*/
	  								return 1 /*df.promise*/;
	    						}).value();

    		Q.all(promiseArray).then(function(array){
    			console.log('Success');
    			console.log(array);
    		}).catch(function(error){
    			console.log('There is an error' + error);
    		})

    },

    renderMap: function(mapOptions){
    	var google = this.props.mapService,
    		mapCanvas = document.getElementById('map'),
    		vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0); /*Change this to take into account panel height*/

    	mapCanvas.style.height = vH + 'px';
        this.map = new google.maps.Map(mapCanvas, mapOptions);
        /*Setting this up for later*/
        placesService = new google.maps.places.PlacesService(this.map);
        directionsDisplay.setMap(this.map);
    },

	// Render the component
  	render: function(){
    	return (
      		<div id='map'></div>
    	);
  	}

});
