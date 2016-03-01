/** @jsx React.DOM */

var React = require('react'),
	classNames = require('classnames');

module.exports = FoodTable = React.createClass({

  // Render the component
  render: function(){
    return (
      <div className='food-type-wrapper'>
      	<table border='1'>
      		<thead>
      			Choose your food!
      		</thead>
      		<tbody>
	      		<tr>
	      			<td>
	      				<img src="../images/pizza.svg" alt="pizza" height="75" width="75"/>
	      				<p>Pizza</p>
	      			</td>
	      			<td>
	      				<img src="../images/icecream.svg" alt="ice cream" height="75" width="75"/>
	      				<p>Ice Cream</p>
	      			</td>
	      			<td>
	      				<img src="../images/pasta.svg" alt="pasta" height="75" width="75"/>
	      				<p>Italian</p>
	      			</td>
	      			<td>
	      				<img src="../images/rice.svg" alt="rice" height="75" width="75"/>
	      				<p>Chinese</p>
	      			</td>
	      			<td>
	      				<img src="../images/fruit.svg" alt="carrot" height="75" width="75"/>
	      				<p>Vegetarian</p>
	      			</td>
	      		</tr>
	      		<tr>
	      			<td>
	      				<img src="../images/noodles.svg" alt="noodles" height="75" width="75"/>
	      				<p>Thai</p>
	      			</td>
	      			<td>
	      				<img src="../images/coffee.svg" alt="coffee" height="75" width="75"/>
	      				<p>Coffee</p>
	      			</td>
	      			<td>
	      				<img src="../images/burger.svg" alt="burger" height="75" width="75"/>
	      				<p>Burgers</p>
	      			</td>
	      			<td>
	      				<img src="../images/eggs.svg" alt="eggs" height="75" width="75"/>
	      				<p>Breakfast</p>
	      			</td>
	      			 <td>
	      				<img src="../images/fish.svg" alt="fish" height="75" width="75"/>
	      				<p>Sea Food</p>
	      			</td>
	      		</tr>
	      	</tbody>
      	</table>
      </div>
    )
  }

});