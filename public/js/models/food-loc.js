var Backbone = require('backbone');

var FoodLoc = Backbone.Model.extend({
    defaults: {
        title: '',
        loc: null,
        placeDetails: null,
        placeId: null,
        rating: null,
        price_level: null,
        photos: null, 
    }
});

module.exports = FoodLoc;