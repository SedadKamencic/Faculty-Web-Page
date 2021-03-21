const Sequelize = require("sequelize");
const sequelize = new Sequelize("DBWT19", "root", "root", {
   host: "localhost",
   dialect: "mysql",
   logging:false
});
const db = {};

db.Sequelize=Sequelize;
db.sequelize=sequelize;

//import modela
db.rezervacija = sequelize.import(__dirname+'/Rezervacija.js');
db.termin = sequelize.import(__dirname+'/Termin.js');
db.osoblje = sequelize.import(__dirname+'/Osoblje.js');
db.sala = sequelize.import(__dirname+'/Sala.js');



db.osoblje.hasMany(db.rezervacija,{foreignKey:'osoba'});
db.rezervacija.belongsTo(db.osoblje, {foreignKey:'osoba'});

db.sala.hasMany(db.rezervacija, {foreignKey:'sala'});
db.rezervacija.belongsTo(db.sala, {foreignKey:'sala'});

db.termin.hasOne(db.rezervacija, {foreignKey:'termin'});
db.rezervacija.belongsTo(db.termin, {foreignKey:'termin'});

db.osoblje.hasOne(db.sala, {foreignKey:'zaduzenaOsoba'});
db.sala.belongsTo(db.osoblje, {foreignKey:'zaduzenaOsoba'});


module.exports = db;