var _ = require('lodash');

module.exports = {

	distanceFilter: function (locArray){
		var checkVal = locArray[0],
			start = locArray[0],
			end = locArray[locArray.length - 1],
			that = this,
		 	output = _(locArray)
						.filter(function(loc){
							if(loc == start){
								return loc;
							}else if(loc == end){
								return loc;
							}else{
								if(that.getDistance(checkVal.lat(), checkVal.lng(), loc.lat(), loc.lng()) >= .50){
									checkVal = loc;
									return loc;
								}
							}
						})
						.value();
		return output;
	},

	getDistance: function (lat1, lon1, lat2, lon2) {
	  	var p = 0.017453292519943295,    // Math.PI / 180
	  		c = Math.cos,
			a = 0.5 - c((lat2 - lat1) * p)/2 + 
	          	c(lat1 * p) * c(lat2 * p) * 
	          	(1 - c((lon2 - lon1) * p))/2;

	  	return 7918 * Math.asin(Math.sqrt(a)); // 2 * R; R = 3959 mi
	}
}