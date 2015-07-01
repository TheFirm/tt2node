'use strict';
var Project = require("./project");

module.exports = function(sequelize , DataTypes) {
  var Report = sequelize.define('Report', {
    id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    create_at: DataTypes.DATE,
    date_report: DataTypes.DATE,
    time_start: DataTypes.DATE,
    time_end: DataTypes.DATE,
    comment: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        this.models = models;
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
          offset: (page-1) * this.LIMIT || 0,
          include: {
            model: this.models.Project,
            //as: 'project',
            attributes: [
              'id',
              'name'
            ]
          }
        });
      }
    },
    tableName: 'reports',
    timestamps: false
  });
  return Report;
};