var Backbone = require('backbone'),
    FoodLoc = require('./food-loc');

var FoodLocs = Backbone.Collection.extend({
    model: FoodLoc
});

module.exports = FoodLocs;