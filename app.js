/** @jsx React.DOM */

var React = require('react');
var domReady = require('domready');
var GoogleMapsLoader = require('google-maps');
var Application = require('./components/Application.react');

domReady(function () {
	GoogleMapsLoader.KEY = 'AIzaSyDUpp59oKV8NgrHLY6FCwXS6mKDpoL6sH4';
    GoogleMapsLoader.LIBRARIES = ['places'];
    GoogleMapsLoader.load(function (google) {

    	React.renderComponent(
			<Application mapService={google}/>,
  			document.getElementById('react-app')
		);

    });
});



