const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  const Rezervacija = sequelize.define("Rezervacija", {
    termin:{
        type: Sequelize.INTEGER,
        unique: true
    }
  });
  return Rezervacija;
};
