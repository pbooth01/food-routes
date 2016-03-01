/** @jsx React.DOM */

var React = require('react');

var EmptyHeader = React.createClass({
		render: function () {
	        return null;
		}
	});

var FilledHeader = React.createClass({
	render: function () {
		var time = this.props.route.get('time'),
			distance = this.props.route.get('distance');

		return(
			<div className='panel-header-body'>
				<div className="distance-info">
		      		<h1> {time} </h1>
		     	</div>
		     	<div className="time-info">
		     		<h1>{distance}</h1>
		     	</div>
	     	</div>
			);
		} 
});



module.exports = PanelHeader = React.createClass({
  // Render the component
  render: function(){
  	var distance = this.props.route.get('distance'),
  		time = this.props.route.get('time'),
  		shouldShow = distance && time,
  		returnHTML = null;

  	if(shouldShow){
  		returnHTML = (<FilledHeader route={this.props.route}/>);
  	}else{
  		returnHTML = (<EmptyHeader/>);
  	}

    return (
      <div className="panel-header">
      	{returnHTML}
      </div>
    )
  }

});