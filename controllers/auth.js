var express = require('express')
    , passport = require('passport')
    , router = express.Router();

router.get('/google',
    passport.authenticate('google', {scope: [
        'https://www.googleapis.com/auth/userinfo.email'
    ]}),
    function (req, res) {
    });

router.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/', successRedirect: '/'})
    /*function (req, res) {
        res.send("<script>console.log(window.opener);window.opener.postMessage(true, opener.location.origin);</script>");
    }*/
);

router.get('/logout', function(req, res){
    req.session.destroy(function(){
        res.redirect('/');
    });
});

module.exports = router;