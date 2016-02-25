/** @jsx React.DOM */

var React = require('react');
var domReady = require('domready');
var GoogleMapsLoader = require('google-maps');
var Application = require('./components/Application.react');


// Render the components, picking up where react left off on the server

domReady(function () {
	GoogleMapsLoader.KEY = '';
    GoogleMapsLoader.LIBRARIES = ['places'];
    GoogleMapsLoader.load(function (google) {

    	React.renderComponent(
			<Application mapService={google}/>,
  			document.getElementById('react-app')
		);

    });
});



