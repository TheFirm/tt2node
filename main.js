var express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session'),
    FileStore = require('session-file-store')(session),
    config = require("./config2/config").c,
    models = require("./models")
    ;

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(
    session({
        store: new FileStore(/*options*/),
        secret: 'keyboard cat23'
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use('/bower_components',  express.static('bower_components'));
require("./passportInit");
app.use('/', require('./controllers/'));
//var passportConfig = require("./passportInit")(passport, models)
//    , routes = require("./routes")(app, passport, models, express);


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


models.sequelize.sync().then(function () {
    var server = app.listen(config.port, function () {
        console.log('Express server listening on port ' + config.port);
    });
});