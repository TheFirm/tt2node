'use strict';
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
        // associations can be defined here
      }
    },
    tableName: 'reports',
    timestamps: false
  });
  return Report;
};