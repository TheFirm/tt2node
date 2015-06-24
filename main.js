var express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session'),
    config = require("./config2/config").c;

var models = require("./models");

var app = express();

//app.configure(function() {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session({ secret: 'keyboard cat' }));

    //app.set('views', __dirname + '/views');
    //app.set('view engine', 'ejs');
    //app.use(express.logger());
    //app.use(express.cookieParser());
    //app.use(express.bodyParser());
    //app.use(express.methodOverride());

    // Initialize Passport!  Also use passport.session() middleware, to support
    // persistent login sessions (recommended).
    app.use(passport.initialize());
    app.use(passport.session());
    //app.use(express.static(__dirname + '/public'));
//});



var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
        clientID: '767269423185-e3i5q0lpbdcuh92bhp02f3c380pccrmr.apps.googleusercontent.com',
        clientSecret: 'IawGMj4IcBa9JW4b78bDUH24',
        callbackURL: "http://localhost:8083/auth/google/callback"
    },
    function(token, tokenSecret, profile, done) {
        console.log(arguments);
        done(null, profile);
    }
));

//app.get('*', function(req, res, next) {
//    res.json({message: "Not found"});
//});
//
//app.post('*', function(req, res, next) {
//    res.json({message: "Not found"});
//});
//
//app.delete('*', function(req, res, next) {
//    res.json({message: "Not found"});
//});
//
//app.put('*', function(req, res, next) {
//    res.json({message: "Not found"});
//});

//var router = express.Router();
//
//router.get('/', function(req, res) {
//    res.json({ message: 'hooray! welcome to our api!' });
//});
//
//router.get('/test', function(req, res) {
//    models.Project.findAll().then(function(projects) {
//        res.json(projects);
//    });
//});
//
//app.use('/api', router);

//app.error(function(err, req, res, next){
//    if (err instanceof NotFound) {
//        res.json(null);
//    } else {
//        next(err);
//    }
//});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
    function(req, res){});

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });



models.sequelize.sync().then(function () {
    var server = app.listen(config.port, function() {
        console.log('Express server listening on port ' + config.port);
    });
});