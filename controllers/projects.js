var express = require('express'),
    router = express.Router(),
    models = require("../models/"),
    _ = require('underscore');

router.get('/list', function (req, res) {
    models.Project.getActive().then(function (projects) {
        var json = projects.map(function (project) {
            return _.pick(project, 'id', 'name');
        });
        res.status(json.length ? 200 : 204);
        res.json(json);
    });
});

module.exports = router;