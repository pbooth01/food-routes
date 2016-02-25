/** @jsx React.DOM */

var React = require('react'),
	domReady = require('domready'),
	ReactDOM = require('react-dom'),
	GoogleMapsLoader = require('google-maps'),
	Application = require('./components/Application.react');

domReady(function () {
    GoogleMapsLoader.LIBRARIES = ['places'];
    GoogleMapsLoader.load(function (google) {

    	ReactDOM.render(
			<Application mapService={google}/>,
  			document.getElementById('react-app')
		);

    });
});



