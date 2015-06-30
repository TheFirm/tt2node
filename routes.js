module.exports = function (app, passport) {
    app.get('/auth/google',
        passport.authenticate('google', {scope: [
            'https://www.googleapis.com/auth/userinfo.email'
        ]}),
        function (req, res) {
            debugger;
        });

    app.get('/auth/google/callback',
        passport.authenticate('google', {failureRedirect: '/', successRedirect: '/reports'})
    );

    app.get('/', function (req, res) {
        if(req.session.passport.user && req.session.passport.user.id){
            res.redirect("/reports");
        } else {
            res.render('index', {title: 'Hey', message: 'Hello there!'});
        }
    });

    app.get('/reports', function (req, res) {
        if(!req.session.passport.user){
            res.redirect("/");
        } else {
            res.render('reports', {title: 'Hey', message: 'Hello there!'});
        }
    });

    app.get('/logout', function(req, res){
        req.session.destroy(function(){
            res.redirect('/');
        });
    });
};