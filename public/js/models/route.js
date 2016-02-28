var Backbone = require('backbone'),
    WayPoints = require('./way-points');

var Route = Backbone.Model.extend({
    defaults: {
        name: 'Route',
        distance: null,
        time: null,
        wayPoints: new WayPoints(),
        overview_path: null, /*This is an array of LatLng's from Google*/
        filtered_path: null
    }
});

module.exports = Route;