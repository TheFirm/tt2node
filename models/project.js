'use strict';
module.exports = function(sequelize , DataTypes) {
  var Project = sequelize.define('Project', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    active: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      getActive: function () {
        return Project.findAll({
          where: {
            active: 1
          },
          limit: 300
        });
      }
    },
    tableName: 'projects',
    timestamps: false
  });
  return Project;
};