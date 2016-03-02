/** @jsx React.DOM */

var React = require('react');

module.exports = WayPoint = React.createClass({

	componentDidMount: function () {
  		var node = this.refs['wayPoint'],
        	google = this.props.mapService;
   
        this.autoComplete = new google.maps.places.Autocomplete(node);
        google.maps.event.addListener(this.autoComplete, 'place_changed', this.onPlaceChange);
    },

    onPlaceChange: function () {
        var place = this.autoComplete.getPlace();

        if(place){
        	var	options={
        		name: place.formatted_address,
        		placeId: place.place_id
        	};
        	this.props.updateRoute(this.props.index, options);/*figure out why this context is working. This is a callback function*/
        }
    },

	// Render the component
  	render: function(){
    	return (
      		<div className="input">
      			 <input className="waypoint-text" ref='wayPoint' type='text' name='wayPoint' defaultValue={this.props.pointInfo.get('name')}/>
      		</div>
    	);
  	}
});