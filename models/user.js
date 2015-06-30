'use strict';
module.exports = function(sequelize , DataTypes) {
  var User = sequelize.define('User', {
    id: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    mail: DataTypes.STRING,
    type: DataTypes.INTEGER,
    auth_key: DataTypes.INTEGER

  }, {
    classMethods: {
      associate: function(models) {
      }
    },
    tableName: 'users',
    timestamps: false
  });
  return User;
};