let assert = chai.assert;
let kalendar = document.getElementById("vanjska");
describe('Kalendar', function () {

  it('treba nacrtati mjesec sa 30 dana(juni u ovom slucaju)', function () {
    Kalendar.iscrtajKalendar(kalendar, 5)
    let celije = document.getElementsByClassName("broj");
    assert.equal(celije.length, 30, "Broj celija treba biti 30");
  });

  it('treba nacrtati trenutni mjesec da je zadnji dan subota', function () {
    Kalendar.iscrtajKalendar(kalendar, 10); 
    assert.equal(Mjesec.trenutniZadnjiDan(), 5, "trenitniZadnjiDan treba bit 5 što odgovara suboti");
  });


  it('treba nacrtati mjesec sa 31 danom(januar u ovom slucaju)', function () {
    Kalendar.iscrtajKalendar(kalendar, 0)
    let celije = document.getElementsByClassName("broj");
    assert.equal(celije.length, 31, "Broj celija treba biti 31");
  });



  it('treba nacrtati trenutni mjesec da je 1. dan petak', function () {
    Kalendar.iscrtajKalendar(kalendar, 10);
    assert.equal(Mjesec.trenutniPrviDan(), 4, "trenutniPrviDan treba bit 4 što odgovara petku");
  });


  it('januar ima 31 dan pocevsi od utorka', function () {
    Kalendar.iscrtajKalendar(kalendar, 0);
    assert.equal(Mjesec.trenutniPrviDan(), 1, "Januar treba poceti utorkom");
    assert.equal(Mjesec.brojDana(), 31, "Januar treba imati 31 dan")
  });

  it('Iscrtamo mart pa probamo sa negativnim parametrom iscrtati, treba ostati mart', function () {
    Kalendar.iscrtajKalendar(kalendar, 2);
    Kalendar.iscrtajKalendar(kalendar, -5);
    assert.equal(Mjesec.trenutniMjesec(), 2, "Mjesec treba bit mart");
  });


  it('Iscrtamo mart pa probamo sa parametrom>11 iscrtati, treba ostati mart', function () {
    Kalendar.iscrtajKalendar(kalendar, 2);
    Kalendar.iscrtajKalendar(kalendar, 15);
    assert.equal(Mjesec.trenutniMjesec(), 2, "Mjesec treba bit mart");
  });
});


describe('Zauzeca', function () {
  it('ObojiZauzeca sa praznim ulaznim podacima', function () {
    Kalendar.ucitajPodatke([], []);
    Kalendar.iscrtajKalendar(kalendar, 2);


    Kalendar.obojiZauzeca(kalendar, 2, null, null, null);
    let celije = document.getElementsByClassName("zauzetaSala");
    assert.equal(celije.length, 0, "Treba bit 0 zauzetih");
  });

  it('ObojiZauzeca sa duplom vrijednoscu za 25. Oktobar u sali 0-01', function () {
    Kalendar.ucitajPodatke([], []);
    Kalendar.iscrtajKalendar(kalendar, 9);
 
 
    let vanredni = [
      {
        datum: new Date('2019-10-25'),
        pocetak: "10:00",
        kraj: "11:00",
        naziv: "0-01",
        predavac: "Meho Mehic"
      },
      {
        datum: new Date('2019-10-25'),
        pocetak: "10:00",
        kraj: "11:00",
        naziv: "0-01",
        predavac: "Meho Mehic"
      }
    ]
    Kalendar.ucitajPodatke([], vanredni);
    Kalendar.obojiZauzeca(kalendar, 9 ,"0-01","10:00","11:00");
    let celije = document.getElementsByClassName("zauzetaSala");
    assert.equal(celije.length, 1, "Treba bit 1 zauzeta");
  });

  it('ObojiZauzeca periodicno za zimski semestar sa iscrtanim aprilom', function () {
    Kalendar.ucitajPodatke([], []);
    Kalendar.iscrtajKalendar(kalendar, 3);
    let periodicni = [
      {
        dan: 3,
        semestar: "zimski",
        pocetak: "08:00",
        kraj: "09:30",
        naziv: "2-02",
        predavac: "Meho Mehic"
      }
    ]

    Kalendar.ucitajPodatke(periodicni, []);
    Kalendar.obojiZauzeca(kalendar, 3, "2-02", "08:00", "09:30");
    let celije = document.getElementsByClassName("zauzetaSala");
    assert.equal(celije.length, 0, "Treba bit 0 zauzetih");
  });


  it('ObojiZauzeca za neki drugi mjesec', function () {
    Kalendar.ucitajPodatke([], []);
    Kalendar.iscrtajKalendar(kalendar, 0);

    let vanredni = [
      {
        datum: new Date("2019-1-28"),
        pocetak: "10:00",
        kraj: "11:00",
        naziv: "1-01",
        predavac: "Neko Nekic"
      }
    ]

    Kalendar.ucitajPodatke([], vanredni);
    Kalendar.obojiZauzeca(kalendar, 3, "2-02", "10:00", "11:00");
    let celije = document.getElementsByClassName("zauzetaSala");
    assert.equal(celije.length, 0, "Treba bit 0 zauzetih jer smo zauzeli april a iscrtan je januar");
  });

  it('ObojiZauzeca za svaki dan u mjesecu', function () {
    Kalendar.ucitajPodatke([], []);
    Kalendar.iscrtajKalendar(kalendar, 10);

    let vanredni = [];
    for (let i = 1; i <= 30; i++) {
      vanredni.push({
        datum: new Date("2019-11-" + i),
        pocetak: "10:00",
        kraj: "11:00",
        naziv: "0-01",
        predavac: "Hamid Hamic"
      })
    }

    Kalendar.ucitajPodatke([], vanredni);
    Kalendar.obojiZauzeca(kalendar, 10, "0-01", "10:00 ", "11:00");
    let celije = document.getElementsByClassName("slobodna");
    assert.equal(celije.length, 0, "Treba bit 0 slobodnih jer smo sve zauzeli");
  });

  it('ObojiZauzeca dva puta na isti dan i isti termin', function () {

    Kalendar.ucitajPodatke([], []);
    Kalendar.iscrtajKalendar(kalendar, 10);

    let vanredni = [
      {
        datum: new Date("2019-11-28"),
        pocetak: "10:00",
        kraj: "11:00",
        naziv: "1-01",
        predavac: "Neko Nekic"
      }
    ]

    Kalendar.ucitajPodatke([], vanredni);
    Kalendar.obojiZauzeca(kalendar, 10, "1-01", "10:00", "11:00");
    Kalendar.obojiZauzeca(kalendar, 10, "1-01", "10:00", "11:00");
    let celije = document.getElementsByClassName("zauzetaSala");
    assert.equal(celije.length, 1, "Treba bit 1 zauzeta");
  });


  it('ObojiZauzeca 2 puta sa razlicitim podacima', function () {
    Kalendar.ucitajPodatke([], []);
    Kalendar.iscrtajKalendar(kalendar, 10);

    let vanredni = [
      {
        datum: new Date("2019-11-28"),
        pocetak: "10:00",
        kraj: "11:00",
        naziv: "1-01",
        predavac: "Neko Nekic"
      }
    ]

    Kalendar.ucitajPodatke([], vanredni);
    Kalendar.obojiZauzeca(kalendar, 10, "1-01", "08:00", "09:30");
    vanredni.push(      {
      datum: new Date("2019-11-27"),
      pocetak: "10:00",
      kraj: "11:00",
      naziv: "1-01",
      predavac: "Neko Nekic"
    })
    Kalendar.ucitajPodatke([], vanredni);
    Kalendar.obojiZauzeca(kalendar, 10, "1-01", "08:00", "09:30");
    let celije = document.getElementsByClassName("zauzetaSala");
    assert.equal(celije.length, 2, "Trebaju ostati rezultati zadnjeg niza zauzeca, a on je imao 2 zauzeta dana, dok je prvi 1");
  });

  it('ObojiZauzeca periodicno svake srijede za dati semestar', function () {
    Kalendar.ucitajPodatke([], []);
    Kalendar.iscrtajKalendar(kalendar, 10);
    let periodicni = [
      {
        dan: 2,
        semestar: "zimski",
        pocetak: "08:00",
        kraj: "09:30",
        naziv: "2-02",
        predavac: "Meho Mehic"
      }
    ]

    Kalendar.ucitajPodatke(periodicni, []);
    Kalendar.obojiZauzeca(kalendar, 10, "2-02", "08:00", "09:30");

    let celije = document.getElementsByClassName("zauzetaSala");
    assert.equal(celije.length, 4, "Trebaju biti 4 srijede u novembru");
    for (let i = 0; i < 4; i++) {
      let broj = parseInt(celije[i].parentElement.parentElement.getElementsByClassName("broj")[0].innerHTML);
      assert.equal(broj % 7, 6, "Modulo datuma svih srijeda u novembru treba biti 7");
    }
  });


  it('ObojiZauzeca 7 periodicnih za svaki dan datog semestra, treba cijeli semestar bit zauzet', function () {
    Kalendar.ucitajPodatke([], []);
    Kalendar.iscrtajKalendar(kalendar, 0);
    let periodicni = [];

    for (let i = 0; i < 7; i++) {
      periodicni.push(
        {
          dan: i,
          semestar: "zimski",
          pocetak: "08:00",
          kraj: "09:30",
          naziv: "2-02",
          predavac: "Meho Mehic"
        }
      )
    }

    Kalendar.ucitajPodatke(periodicni, []);
    Kalendar.obojiZauzeca(kalendar, 0, "2-02", "08:00", "09:30");
    let celije = document.getElementsByClassName("slobodna");
    assert.equal(celije.length, 0, "Trebaju biti 0 slobodnih jer smo periodicno sve zauzeli");

    let mj;
    for (mj = 9; mj <= 11; mj++) {
      Kalendar.iscrtajKalendar(kalendar, mj);
      Kalendar.obojiZauzeca(kalendar, mj, "2-02", "08:00", "09:30");
      celije = document.getElementsByClassName("slobodna");
      assert.equal(celije.length, 0, "Trebaju biti 0 slobodnih jer smo periodicno sve zauzeli");
    }
  });
});