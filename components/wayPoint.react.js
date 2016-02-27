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
        console.log(place);
    },

	// Render the component
  	render: function(){
    	return (
      		<div className="input">
      			 <input ref='wayPoint' type='text' name='wayPoint' defaultValue={this.props.pointInfo.get('name')}/>
      		</div>
    	);
  	}
});