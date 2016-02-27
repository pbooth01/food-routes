/** @jsx React.DOM */

var React = require('react'),
	vent = require('../public/js/utilities/vent'),
    Q = require('q');

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
    },

    renderRoute: function(){
    	var google = this.props.mapService,
    		directionsRequest = {
    			origin: 'xxxxxxx',
    			destination: 'xxxxxxx',
    			travelMode: google.maps.DirectionsTravelMode.DRIVING
    		};
    	directionsService.route(
  			directionsRequest,
  			function(response, status){
    			if (status == google.maps.DirectionsStatus.OK){
      				directionsDisplay.setDirections(response);
    			}
    			else
      				alert("Unable to retrieve your route");
  			}			
		);
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
