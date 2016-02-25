/** @jsx React.DOM */

var React = require('react');
var Header = require ('./header.react');

// Export the Application component
module.exports = Application = React.createClass({

  // Render the component
  render: function(){
    return (
      <Header/>
    );
  }

});
