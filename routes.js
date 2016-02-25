var JSX = require('node-jsx').install(),
  React = require('react');
  RoutesApp = React.createFactory(require('./components/HelloWorld.react'))

module.exports = {

  index: function (req, res) {


  	var markup = React.renderToString(
    	RoutesApp({})
    );

    // Render our 'home' template
      res.render('home', {
        markup: markup, // Pass rendered react markup
      });
  }
}
