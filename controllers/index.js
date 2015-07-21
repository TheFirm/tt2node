var express = require('express'),
    apiRouter = express.Router();

module.exports = function (app) {
    app.get('/', function (req, res) {
        if(req.session.passport.user && req.session.passport.user.id){
            res.render('reports', {title: 'Hey report', message: 'Hello there!'});
        } else {
            res.render('index', {title: 'Hey index', message: 'Hello there!'});
        }
    });

    app.use('/api', apiRouter);
    apiRouter.use('/auth', require('./auth.js'));
    apiRouter.all('*', function (req, res, next) {
        !req.session.passport.user ? res.sendStatus(401) : next();
    });
    apiRouter.use('/project', require('./projects.js'));
    apiRouter.use('/report', require('./reports.js'));
};