/** @jsx React.DOM */

var React = require('react'),
	vent = require('../public/js/utilities/vent'),
  Q = require('q'),
  _ = require('lodash'),
	WayPoints = require('../public/js/models/way-points'),
  FoodLocModel = require('../public/js/models/food-loc'),
  FoodLocCollection = require('../public/js/models/food-locs'),
	RouteModel = require('../public/js/models/route'),
  RequestModel = require('../public/js/models/request'),
	RouteCollection = require('../public/js/models/routes'),
	Header = require ('./header.react'),
	Panel = require ('./panel.react'),
	Map = require ('./map.react');

// Export the Application component
module.exports = Application = React.createClass({

	 getInitialState: function() {
    	return {
        map: null,
    		route: this.initializeRoute(),
    		foodDestinations: null,
        request: this.initializeRequest()
    	};
  	},

  	initializeRoute: function(){
  		var route = new RouteModel();

      route.get('wayPoints').add([
        {name: 'start'},
        {name: 'end'}
      ]);

      return route;
  	},

    initializeRequest: function(){
      return new RequestModel();
    },

    setMap: function(map){
      this.setState({map: map});
    },

  	updateRouteInfo: function(index, options){
  		var wayPoints = this.state.route.get('wayPoints'),
  			route = wayPoints.at(index);
  		
  		route.set(options);
  		
  		this.setState({route: this.state.route});
  		vent.trigger('map:renderRoute');
  	},

  	updatePathInfo: function(data){
  		var route = this.state.route;

  		route.set(data);

  		this.setState({route: this.state.route});
  	},

    updateRequestInfo: function(data){
      var request = this.state.request;

      request.set(data);
      this.setState({request: this.state.request});
      console.log(this.state.request);
    },

    removeDuplicates: function(chunkedArray){
      var FoodLocs = new FoodLocCollection(),
          uniqueLocs = null,

      uniqueLocs = _(chunkedArray)
                     .flatten()
                     .uniqBy('id')
                     .value();

      _.forEach(uniqueLocs, function(place){

        FoodLocs.add([{
          title: place.name,
          loc: place.geometry.location,
          placeId: place.id,
        }]);

      });

      return FoodLocs;
    },

    getFoodOnRoute: function(){

      var sleep = function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
              break;
          }
        }
      };

      var google = this.props.mapService,
          foodLatLngs = this.state.route.get('filtered_path'),
          that = this;

          if(foodLatLngs){

            var service = new google.maps.places.PlacesService(this.state.map);

            promiseArray = _(foodLatLngs)
                            .map(function(pos, index){
                              var df = Q.defer(),
                                  request = that.state.request;

                              request.set({location: pos});
                              request = request.attributes;

                              console.log(request);
                        
                              if(index % 3 === 0)
                                sleep((Math.random() * (4 - 1) + 1) * 800);

                              service.nearbySearch(request, function(results, status){
                                  if (status == google.maps.places.PlacesServiceStatus.OK) {
                                    console.log("search");
                                  df.resolve(results);
                                }else{
                                  console.log('error: ' + status);
                                  df.resolve([]);
                                }
                              });
                            
                              return df.promise;
                            }).value();

            Q.all(promiseArray).then(function(array){
              var output = null;
              console.log('Success');
              output = that.removeDuplicates(array);
              that.setState({foodDestinations: output});
              console.log("REsolved");
              console.log(that.state.foodDestinations);
              vent.trigger('map:renderFood');
            }).catch(function(error){
              console.log('There is an error' + error);
            })
          }
    },

  	// Render the component
  	render: function(){
  		var mapService = this.props.mapService,
  			route = this.state.route,
        foodLocs = this.state.foodDestinations,
  			updateRoute = this.updateRouteInfo,
  			updatePath = this.updatePathInfo,
        updateRequest = this.updateRequestInfo,
        getFood = this.getFoodOnRoute,
        setMap = this.setMap;

    	return (
    		<div className='application-wrapper'>
      			<Header/>
      			<Panel 
      				mapService={mapService} 
      				route={route}
      				updateRoute={updateRoute}
              updateRequest={updateRequest}
              getFood={getFood}/>
      			<Map 	
      				mapService={mapService} 
      				route={route}
              foodLocs={foodLocs}
      				updatePath={updatePath}
              setMap={setMap}/>
      		</div>
    	);
  	}
});
