const db = require("./db.js");
db.sequelize.sync({ force: true }).then(function () {
  inicializacijaPodataka().then(function () {
    console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!...");
    process.exit();
  });
});

function inicializacijaPodataka() {
  var osoba1, osoba2, osoba3;
  var osobljeListaPromisea = [];
  var salaListaPromisea = [];
  var terminListaPromisea = [];
  var rezervacijaListaPromisea = [];

  return new Promise(function (resolve, reject) {
    osobljeListaPromisea.push(
      db.osoblje.create({ ime: "Neko", prezime: "Nekić", uloga: "profesor" })
    );
    osobljeListaPromisea.push(
      db.osoblje.create({ ime: "Drugi", prezime: "Neko", uloga: "asistent" })
    );
    osobljeListaPromisea.push(
      db.osoblje.create({ ime: "Test", prezime: "Tests", uloga: "asistent" })
    );

    Promise.all(osobljeListaPromisea)
      .then(function (osoblje) {
        var osoba1 = osoblje.filter(function (a) {
          return a.ime === "Neko";
        })[0];
        var osoba2 = osoblje.filter(function (a) {
          return a.ime === "Drugi";
        })[0];
        var osoba3 = osoblje.filter(function (a) {
          return a.ime === "Test";
        })[0];

        salaListaPromisea.push(
          db.sala.create({ naziv: "1-11" }).then(function (o) {
            o.setOsoblje(osoba1);
            return new Promise(function (resolve, reject) {
              resolve(o);
            });
          })
        );
        salaListaPromisea.push(
          db.sala.create({ naziv: "1-15" }).then(function (o) {
            o.setOsoblje(osoba2);
            return new Promise(function (resolve, reject) {
              resolve(o);
            });
          })
        );
        Promise.all(salaListaPromisea)
          .then(function (sala) {
            var sala1 = sala.filter(function (s) {
              return s.naziv === "1-11";
            })[0];
            var sala2 = sala.filter(function (s) {
              return s.naziv === "1-15";
            })[0];

            terminListaPromisea.push(
              db.termin.create({
                redovni: false,
                dan: null,
                datum: "01.01.2020",
                semestar: null,
                pocetak: "12:00",
                kraj: "13:00"
              })
            );
            terminListaPromisea.push(
              db.termin.create({
                redovni: true,
                dan: 0,
                datum: null,
                semestar: "zimski",
                pocetak: "13:00",
                kraj: "14:00"
              })
            );
            Promise.all(terminListaPromisea)
              .then(function (termin) {
                var termin1 = termin.filter(function (t) {
                  return t.id === 1;
                })[0];
                var termin2 = termin.filter(function (t) {
                  return t.id === 2;
                })[0];

                db.rezervacija.create({}).then(function (t) {
                  t.setTermin(termin1);
                  t.setSala(sala1);
                  t.setOsoblje(osoba1);
                  return new Promise(function (resolve, reject) {
                    resolve(t);
                  });
                })
                db.rezervacija.create({}).then(function (t) {
                  t.setTermin(termin2);
                  t.setSala(sala1);
                  t.setOsoblje(osoba3);
                  return new Promise(function (resolve, reject) {
                    resolve(t);
                  });
                })
              })
              .catch(function (greska) {
                console.log("Termin greska " + greska);
              });
          })
          .catch(function (greska) {
            console.log("Sala greska " + greska);
          });
      })
      .catch(function (greska) {
        console.log("Osoblje greska " + greska);
      });
  }).catch(function (greska) {
    console.log("Generalna greska " + greska);
  });
}
