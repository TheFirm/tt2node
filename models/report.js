'use strict';
var Project = require("./project"),
    moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    var custom_errors = {
        date: 'Must be valid date'
    };

    var Report = sequelize.define('Report', {
        id: {
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        create_at: {
            type: DataTypes.DATE
        },
        date_report: {
            type: DataTypes.DATE,
            allowNull: false,
            validate:  {
                isDate: {
                    msg: custom_errors.date
                }
            }
        },
        time_start: {
            type: DataTypes.DATE,
            allowNull: false,
            validate:  {
                isDate: {
                    msg: custom_errors.date
                }
            }
        },
        time_end: {
            type: DataTypes.DATE,
            allowNull: false,
            validate:  {
                isDate: {
                    msg: custom_errors.date
                }
            }
        },
        comment: {
            type: DataTypes.TEXT
        }
    }, {
        classMethods: {
            associate: function (models) {
                this.models = models;
                /* todo sequelize new version research belongsTo method*/
                Report.belongsTo(models.Project, {foreignKey: 'project_id'/*, 'as': 'project'*/});
                //models.Project.belongsTo(Report/*, {foreignKey: 'project_id', 'as': 'project'}*/);
            },
            LIMIT: 10,
            getByUser: function (user_id, page) {
                console.log(Project);
                return Report.findAndCount({
                    where: {
                        user_id: user_id
                    },
                    order: [
                        ['create_at', 'DESC']
                    ],
                    limit: this.LIMIT,
                    offset: (page - 1) * this.LIMIT || 0,
                    include: {
                        model: this.models.Project,
                        //as: 'project',
                        attributes: [
                            'id',
                            'name'
                        ]
                    }
                });
            },
            add: function (user_id, report) {
                var periodsMatchCount = 0;
                return Report.findAndCount({
                    where: {
                        date_report: report.date_report,
                        $or: [
                            {
                                time_start : {
                                    $between: [report.time_start, report.time_end]
                                }
                            },
                            {
                                time_end : {
                                    $between: [report.time_start, report.time_end]
                                }
                            },
                            {
                                time_start : {
                                    $lte: report.time_start
                                },
                                time_end : {
                                    $gte: report.time_end
                                }

                            }
                        ]
                    }
                }).then(function (result) {
                    periodsMatchCount = result.rows.length;
                    if(periodsMatchCount){
                        /* todo write normal error message*/
                        throw new Error({
                            errors : 'period match'
                        })
                    }
                    else{
                        return Report.create({
                            user_id: user_id,
                            project_id: report.project_id,
                            create_at: new Date(),
                            date_report: report.date_report,
                            time_start: moment.utc(report.date_report + ' ' + report.time_start),
                            time_end: moment.utc(report.date_report + ' ' + report.time_end),
                            comment: report.comment
                        });
                    }
                });


            }
        },
        tableName: 'reports',
        timestamps: false
    });
    return Report;
};