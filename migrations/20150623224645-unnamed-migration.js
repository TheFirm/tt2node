'use strict';

var fs = require('fs');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var sql = fs.readFileSync(__dirname + '/init.sql');
    //console.log(queryInterface);
    //console.log(Sequelize);
    return queryInterface.sequelize.query(sql);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
