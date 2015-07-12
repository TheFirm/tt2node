var _ = require('underscore')
    , express = require('express')
    , router = express.Router()
    , models = require("../models/");


function parseIntOr(val, defaultVal){
    var parsed = parseInt(val, 10);
    return !isNaN(val) &&
    parseInt(Number(val)) == val &&
    !isNaN(parsed) ? parsed : defaultVal;
}

router.get('/', function (req, res) {
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

module.exports = router;