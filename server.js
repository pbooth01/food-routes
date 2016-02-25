// Require our dependencies
var express = require('express'),
  exphbs = require('express-handlebars'),
  routes = require('./routes');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 8080;

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

// Disable etag headers on responses
app.disable('etag');


// Index Route
app.get('/', routes.index);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);