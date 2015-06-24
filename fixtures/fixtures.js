var config = require("../config2/config").c;
var models = require("../models/index.js");
var faker = require('faker');

var fixtures = {
    Project: function () {
        var i = 10;
        while(i){
            var project = models.Project.build({
                name: faker.company.companyName(),
                active: faker.helpers.randomNumber(1)
            });
            project.save()
                .error(function(err) {
                    console.error(err);
                });
            i--;
        }
    },
    Users: function () {
        var i = 10;
        while(i){
            var project = models.User.build({
                first_name: faker.company.companyName(),
                active: faker.helpers.randomNumber(1)
            });
            project.save()
                .error(function(err) {
                    console.error(err);
                });
            i--;
        }
    }
};

models.sequelize.sync().then(function () {
    fixtures.Project();
});

