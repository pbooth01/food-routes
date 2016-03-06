var Backbone = require('backbone');

var Request = Backbone.Model.extend({
    defaults: {
        keyword: null,
	    location: null,
	    radius: '1609',
	    travelMode: 'DRIVING',
	    type: 'restaurant'
    }
});

module.exports = Request;