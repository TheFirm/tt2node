var config = require("../config2/config").c;
var models = require("../models/index.js");
var faker = require('faker');

var fixtures = {
    Project: function (i) {
        var projects = [];
        while (i) {
            var project = models.Project.build({
                name: faker.company.companyName(),
                active: faker.helpers.randomNumber(1)
            });
            projects.push(
                project
                    .save()
                    .then(function (item) {
                        return {
                            id: item.null
                        };
                    })
            );
            i--;
        }
        return models.sequelize.Promise.all(projects);
    },
    Users: function (i) {
        var user_q = [];
        while (i) {
            var user = models.User.build({
                first_name: faker.name.firstName(),
                last_name: faker.name.lastName(),
                mail: faker.internet.email()
            });
            user_q.push(
                user.save().then(function (item) {
                    return {
                        id: item.null
                    };
                })
            );
            i--;
        }
        return models.sequelize.Promise.all(user_q);
    },
    Reports: function (count) {
        /*var users = */
        fixtures.Users(10).then(function (users) {
            fixtures.Project(10).then(function (projects) {
                for (var i = 0; i < count; i++) {
                    var project = projects[Math.floor(Math.random() * projects.length)];
                    var user = users[Math.floor(Math.random() * users.length)];
                    genReport(user.id, project.id);
                }
            })
        });

        var genReport = function (user_id, project_id) {
            models.Report.build({
                user_id: user_id,
                project_id: project_id,
                create_at: faker.date.past(),
                date_report: faker.date.past(),
                time_start: faker.date.past(),
                time_end: faker.date.past(),
                comment: faker.lorem.sentence()
            }).save();
        };


    }
};

models.sequelize.sync().then(function () {
    //fixtures.Project(10);
    //fixtures.Users(10);
    fixtures.Reports(100);
});

