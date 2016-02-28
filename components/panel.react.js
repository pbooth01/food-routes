/** @jsx React.DOM */

var React = require('react'),
	PanelHeader = require ('./PanelHeader.react'),
	WayPoint = require ('./wayPoint.react');


module.exports = Panel = React.createClass({

  	render: function(){
  		var route = this.props.route,
  			wayPoints = route.get('WayPoints'),
            self = this;

  			wayPointInputs = wayPoints.map(function(wayPoint, index){
  				
  				var key = 'wayPoint' + index;

  				return(
  					<div className='waypoint-wrapper' key={key}>
  						<WayPoint
  							index={index}
  							mapService={self.props.mapService}
  							updateRoute={self.props.updateRoute}
  							pointInfo={wayPoint} />
  					</div>
  				);
  			});

    	return (
      		<div className='panel-wrapper'>
      			<PanelHeader route={route}/>
      			<div className='waypoint-input-wrapper'>
      				{wayPointInputs}
      			</div>
      		</div>
    	);
  	}

});