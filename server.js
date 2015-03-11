
// BASE SETUP
// =============================================================================


// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));


var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(request, response, next){
  console.log('Something is happening')
  next();
})

app.use(express.static(__dirname + '/public'));

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// router.get('/', function(request, response) {
//     console.log('hey');
//     response.render('app/views/index.html');
// });

// User routes
// -------------------


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
// app.use('/client', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);