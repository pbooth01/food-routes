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
		var df = Q.defer();

		directionsDisplay = new google.maps.DirectionsRenderer();
        directionsService = new google.maps.DirectionsService();

        /*Change this before release*/
        DEFAULT_LOCATION = new google.maps.LatLng(42.748485699999996, -71.05772569999999);
        
    	if ("geolocation" in navigator) {
    		var that = this;

  			navigator.geolocation.getCurrentPosition(function(position) {

  				var userCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  				that.renderMap({
            		zoom: 10,
            		center: userCoords,
            		disableDefaultUI:true
        		});
			});
		} else {
  			this.renderMap({
            		zoom: 10,
            		center: DEFAULT_LOCATION,
            		disableDefaultUI:true
        		});
		}

		window.setTimeout(function(){
			placesService = new google.maps.places.PlacesService(this.map);
		}, 300);
		
    },

    renderMap: function(mapOptions){
    	var google = this.props.mapService,
    		mapCanvas = document.getElementById('map'),
    		vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    	mapCanvas.style.height = vH + 'px';
        this.map = new google.maps.Map(mapCanvas, mapOptions);
        directionsDisplay.setMap(this.map);
    },

	// Render the component
  	render: function(){
    	return (
      		<div id='map'></div>
    	);
  	}

});
