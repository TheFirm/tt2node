var passport = require('passport')
    , models = require('./models/');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
        clientID: '767269423185-e3i5q0lpbdcuh92bhp02f3c380pccrmr.apps.googleusercontent.com',
        clientSecret: 'IawGMj4IcBa9JW4b78bDUH24',
        callbackURL: "http://localhost:8083/api/auth/google/callback"
    },
    function (token, tokenSecret, profile, done) {
        var emails = profile.emails.map(function (item) {
            return item.value;
        });

        models.User.findOne({where: {mail: {"in": emails}}}).then(function (user) {
            done(null, user);
        }, done);
    }
));

passport.serializeUser(function (user, done) {
    var user_data = {
        id: user.id,
        username: user.first_name + ' ' + user.last_name
    };
    done(null, user_data);
});
passport.deserializeUser(function (userData, done) {
    models.User.findOne({where: {"id": userData.id}})
        .then(function (user) {
            done(null, user);
        }, done);
});