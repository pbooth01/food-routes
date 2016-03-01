var JSX = require('node-jsx').install(),
  React = require('react');
  ReactDOMServer = require('react-dom/server'),
  Application = React.createFactory(require('./components/application.react'))

module.exports = {

  index: function (req, res) {
    // Render our 'home' template
      res.render('home');
  }
}
