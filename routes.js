var _ = require('underscore');
/* todo investigate file usage*/
module.exports = function (app, passport, models, express) {
    app.get('/auth/google',
        passport.authenticate('google', {scope: [
            'https://www.googleapis.com/auth/userinfo.email'
        ]}),
        function (req, res) {
        });

    app.get('/auth/google/callback',
        passport.authenticate('google', {failureRedirect: '/', successRedirect: '/reports'})
    );

    app.get('/', function (req, res) {
        if(req.session.passport.user && req.session.passport.user.id){
            res.render('reports', {title: 'Hey routes', message: 'Hello there!'});
        } else {
            res.render('index', {title: 'Hey', message: 'Hello there!'});
        }
    });

    function parseIntOr(val, defaultVal){
        var parsed = parseInt(val, 10);
        return !isNaN(val) &&
                parseInt(Number(val)) == val &&
                !isNaN(parsed) ? parsed : defaultVal;
    }

    app.get('/logout', function(req, res){
        req.session.destroy(function(){
            res.redirect('/');
        });
    });


    var router = express.Router();
    app.use('/api', router);
    router.all('*', function (req, res, next) {
        !req.session.passport.user ? res.send(401) : next();
    });

    router.get('/report', function (req, res) {
        var page = parseIntOr(req.query['page'], 1);
        models.Report.getByUser(req.session.passport.user.id, page).then(function (reports) {
            var json = reports.rows.map(function (report) {
                var data = _.pick(report, 'id', 'create_at', 'date_report', 'time_start', 'time_end', 'comment');
                data.project = _.pick(report.Project, 'id', 'name');
                return data;
            });
            res.setHeader("TotalCount", reports.count);
            res.setHeader("PerPage", models.Report.LIMIT);
            res.status(json.length ? 200 : 204);
            res.json(json);
        });
    });

    router.get('/project', function (req, res) {
        models.Project.getActive().then(function (projects) {
            var json = projects.map(function (project) {
                return _.pick(project, 'id', 'name');
            });
            res.status(json.length ? 200 : 204);
            res.json(json);
        });
    });
};