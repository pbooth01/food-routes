var JSX = require('node-jsx').install(),
  React = require('react');
  Application = React.createFactory(require('./components/application.react'))

module.exports = {

  index: function (req, res) {


  	var markup = React.renderToString(
    	Application({})
    );
    
    // Render our 'home' template
      res.render('home', {
        markup: markup, // Pass rendered react markup
      });
  }
}
