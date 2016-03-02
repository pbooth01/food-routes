/** @jsx React.DOM */

var React = require('react'),
  classNames = require('classnames'),
	PanelHeader = require ('./PanelHeader.react'),
	WayPoint = require ('./wayPoint.react'),
  FoodTable = require ('./foodTable.react');


module.exports = Panel = React.createClass({

  	render: function(){
      var route = this.props.route,
        wayPoints = route.get('wayPoints'),
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
            <div className='panel-body'>

        			<div className='waypoint-input-wrapper'>
        				{wayPointInputs}
        			</div>

              <div className='way-of-travel-wrapper'>
                  <i className="fa fa-user fa-3x"></i> 
                  <i className="fa fa-car fa-3x"></i> 
                  <i className="fa fa-bicycle fa-3x"></i> 
              </div>

              <FoodTable/>

            </div>
      		</div>
    	);
  	}

});