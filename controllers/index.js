var express = require('express')
    , router = express.Router();

router.use('/project', require('./projects.js'));
router.use('/report', require('./reports.js'));
router.use('/auth', require('./auth.js'));


router.get('/', function (req, res) {
    if(req.session.passport.user && req.session.passport.user.id){
        res.render('reports', {title: 'Hey', message: 'Hello there!'});
    } else {
        res.render('index', {title: 'Hey', message: 'Hello there!'});
    }
});


var apiRouter = express.Router();
apiRouter.use('/api', router);
apiRouter.all('*', function (req, res, next) {
    !req.session.passport.user ? res.sendStatus(401) : next();
});

module.exports = apiRouter;