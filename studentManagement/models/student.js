'use strict';
module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    name: DataTypes.STRING,
    gpa: DataTypes.DOUBLE,
    dob: DataTypes.DATE,
    address: DataTypes.STRING
  }, {});
  student.associate = function(models) {
    // associations can be defined here
  };
  return student;
};