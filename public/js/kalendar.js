var podaci=[];
let Mjesec = (function () {
    let _mjesecUBroj = {
        'januar': 0,
        'februar': 1,
        'mart': 2,
        'april': 3,
        'maj': 4,
        'juni': 5,
        'juli': 6,
        'august': 7,
        'septembar': 8,
        'oktobar': 9,
        'novembar': 10,
        'decembar': 11
    }
    let _mjesecUString = {
        0: 'januar',
        1: 'februar',
        2: 'mart',
        3: 'april',
        4: 'maj',
        5: 'juni',
        6: 'juli',
        7: 'august',
        8: 'septembar',
        9: 'oktobar',
        10: 'novembar',
        11: 'decembar',
    }
    let _trenutniMjesec = new Date().getMonth();
    function trenutniMjesec(mjesec = -1) {
        if (mjesec!= -1){
            _trenutniMjesec = mjesec;
        }
        return _trenutniMjesec
    }
    function mjesecUString(m) {
        return _mjesecUString[m];
    }
    function mjesecUBroj(b) {
        return _mjesecUBroj[b];
    }
    function brojDana(month=-1) {
        if(month == -1){
            month = _trenutniMjesec;
        }
        return new Date(2019, month+1, 0).getDate();
    }
    function sljedeci() {
        (_trenutniMjesec < 11) ? _trenutniMjesec += 1 : null;
        return _trenutniMjesec;

    }
    function prethodni() {
        (_trenutniMjesec > 0) ? _trenutniMjesec -= 1 : null;
        return _trenutniMjesec;
    }
    function daniMjeseca(month, dannabosanski) {
        dan = {
            0: 1,
            1: 2,
            2: 3,
            3: 4,
            4: 5,
            5: 6,
            6: 0
        }
        d = new Date(2019, Mjesec.mjesecUBroj(month), 1);
        month = d.getMonth();
        days = [];

        d.setDate(1);

        while (d.getDay() !== dan[dannabosanski]) {
            d.setDate(d.getDate() + 1);
        }

        while (d.getMonth() === month) {
            days.push(new Date(d.getTime()));
            d.setDate(d.getDate() + 7);
        }

        return days;
    }
    let danPrevediUBos={
        0:6,
        1:0,
        2:1,
        3:2,
        4:3,
        5:4,
        6:5
    }
    function trenutniPrviDan(){
        return danPrevediUBos[new Date(2019, _trenutniMjesec, 1).getDay()];
    }
    function trenutniZadnjiDan(){
        return danPrevediUBos[new Date(2019, _trenutniMjesec,30).getDay()];
    }
    return {
        trenutniMjesec: trenutniMjesec,
        mjesecUString: mjesecUString,
        mjesecUBroj: mjesecUBroj,
        brojDana: brojDana,
        sljedeci: sljedeci,
        prethodni: prethodni,
        daniMjeseca: daniMjeseca,
        trenutniPrviDan: trenutniPrviDan,
        trenutniZadnjiDan: trenutniZadnjiDan,
    }
}());
function dajTermine(zauzece) {
    let termini = [];
    if (zauzece["semestar"].toUpperCase() == "ZIMSKI") {
        let dani = Mjesec.daniMjeseca('oktobar', zauzece.dan)
        for (dan in dani) {
            termini.push({
                datum: dani[dan],
                pocetak: zauzece.pocetak,
                kraj: zauzece.kraj,
                naziv: zauzece.naziv,
                predavac: zauzece.predavac
            });
        }
        dani = Mjesec.daniMjeseca('novembar', zauzece.dan)
        for (dan in dani) {
            termini.push({
                datum: dani[dan],
                pocetak: zauzece.pocetak,
                kraj: zauzece.kraj,
                naziv: zauzece.naziv,
                predavac: zauzece.predavac
            });
        }
        dani = Mjesec.daniMjeseca('decembar', zauzece.dan)
        for (dan in dani) {
            termini.push({
                datum: dani[dan],
                pocetak: zauzece.pocetak,
                kraj: zauzece.kraj,
                naziv: zauzece.naziv,
                predavac: zauzece.predavac
            });
        }
        dani = Mjesec.daniMjeseca('januar', zauzece.dan)
        for (dan in dani) {
            termini.push({
                datum: dani[dan],
                pocetak: zauzece.pocetak,
                kraj: zauzece.kraj,
                naziv: zauzece.naziv,
                predavac: zauzece.predavac
            });
        }
    } else {
        let dani = Mjesec.daniMjeseca('februar', zauzece.dan)
        for (dan in dani) {
            termini.push({
                datum: dani[dan],
                pocetak: zauzece.pocetak,
                kraj: zauzece.kraj,
                naziv: zauzece.naziv,
                predavac: zauzece.predavac
            });
        }
        dani = Mjesec.daniMjeseca('mart', zauzece.dan)
        for (dan in dani) {
            termini.push({
                datum: dani[dan],
                pocetak: zauzece.pocetak,
                kraj: zauzece.kraj,
                naziv: zauzece.naziv,
                predavac: zauzece.predavac
            });
        }
        dani = Mjesec.daniMjeseca('april', zauzece.dan)
        for (dan in dani) {
            termini.push({
                datum: dani[dan],
                pocetak: zauzece.pocetak,
                kraj: zauzece.kraj,
                naziv: zauzece.naziv,
                predavac: zauzece.predavac
            });
        }
        dani = Mjesec.daniMjeseca('maj', zauzece.dan)
        for (dan in dani) {
            termini.push({
                datum: dani[dan],
                pocetak: zauzece.pocetak,
                kraj: zauzece.kraj,
                naziv: zauzece.naziv,
                predavac: zauzece.predavac
            });
        }
        dani = Mjesec.daniMjeseca('juni', zauzece.dan)
        for (dan in dani) {
            termini.push({
                datum: dani[dan],
                pocetak: zauzece.pocetak,
                kraj: zauzece.kraj,
                naziv: zauzece.naziv,
                predavac: zauzece.predavac
            });
        }
    }
    return termini;
}

let Kalendar = (function () {

    function obojiZauzecaImpl(kalendarRef, mjesec, sala, vrijemePocetka, vrijemeKraja) {
        let element = document.getElementById(kalendarRef);
        if (mjesec == Mjesec.trenutniMjesec()) {
            var odgovarajuciTermini = [];
            podaci.forEach(el => {
                if (el.datum.getMonth() == mjesec && el.naziv == sala) {
                    odgovarajuciTermini.push(el);
                }
            });
            celije = document.getElementsByClassName("broj");
            for (let i = 0; i < celije.length; i++) {
                for (let j = 0; j < odgovarajuciTermini.length; j++) {
                    if (celije.item(i).innerHTML == odgovarajuciTermini[j].datum.getDate()) {
                        var odgCelija = celije.item(i).parentNode.parentNode.parentNode;
                        odgCelija.getElementsByClassName("slobodnaSala")[0] ? odgCelija.getElementsByClassName("slobodnaSala")[0].className = "zauzetaSala" : null;
                    }
                }
            }
        }
    }
    function ucitajPodatkeImpl(periodicna, vanredna) {
        podaci = [];
        periodicna.forEach(element => {
            podaci = podaci.concat(dajTermine(element));
        });
        vanredna.forEach(element => {
            element.datum = new Date(element.datum);
            podaci = podaci.concat(element);
        })
        return podaci;
    }
    function generisiCeliju(broj, status) {
        return `
        <td>
            <table class="dan" onclick="rezervisiSalu(this)">
                <tr>
                <td class="broj">${broj}</td>
                </tr>
                <tr>
                <td class="${status}"></td>
                </tr>
            </table>
        </td>
        `;
    }
    function iscrtajKalendarImpl(kalendarRef, mjesec) {
        if (mjesec<0 || mjesec>11){
            return;
        }
        Mjesec.trenutniMjesec(mjesec);
        let praznaCelija = `<td>
        <table class="praznaCelija">
          <tr>
            <td class="praznaCelija"></td>
          </tr>
          <tr>
            <td class="praznaCelija"></td>
          </tr>
        </table>
      </td>
      </td>`;
        let d = new Date();
        d.setDate(1);
        d.setMonth(Mjesec.trenutniMjesec());
        let prazneCelije = 0;
        if (d.getDay() == 0) {
            prazneCelije = 6;
        } else {
            prazneCelije = d.getDay() - 1;
        }
        let brojDana = Mjesec.brojDana(Mjesec.trenutniMjesec());
        let preostalo = brojDana;
        let mjesecTekst = Mjesec.mjesecUString(Mjesec.trenutniMjesec());
        document.getElementById("imeMjeseca").innerHTML = mjesecTekst.charAt(0).toUpperCase() + mjesecTekst.slice(1);
        document.getElementById("prva-sedmica").innerHTML = "";
        for (let i = 0; i < 7; i++) {
            if (i < prazneCelije) {
                document.getElementById("prva-sedmica").innerHTML += praznaCelija;
            } else {
                document.getElementById("prva-sedmica").innerHTML += generisiCeliju(i - prazneCelije + 1, "slobodnaSala");
                preostalo--;
            }
        }
        document.getElementById("druga-sedmica").innerHTML = "";
        for (let i = 0; i < 7; i++) {
            document.getElementById("druga-sedmica").innerHTML += generisiCeliju(brojDana - preostalo + 1, "slobodnaSala");
            preostalo--;
        }
        document.getElementById("treca-sedmica").innerHTML = "";
        for (let i = 0; i < 7; i++) {
            document.getElementById("treca-sedmica").innerHTML += generisiCeliju(brojDana - preostalo + 1, "slobodnaSala");
            preostalo--;
        }
        document.getElementById("cetvrta-sedmica").innerHTML = "";
        for (let i = 0; i < 7; i++) {
            document.getElementById("cetvrta-sedmica").innerHTML += generisiCeliju(brojDana - preostalo + 1, "slobodnaSala");
            preostalo--;
        }
        document.getElementById("peta-sedmica").innerHTML = "";
        for (let i = 0; i < 7; i++) {
            if (preostalo > 0) {
                document.getElementById("peta-sedmica").innerHTML += generisiCeliju(brojDana - preostalo + 1, "slobodnaSala");
                preostalo--;
            } else {
                document.getElementById("peta-sedmica").innerHTML += praznaCelija;
            }
        }
        document.getElementById("sesta-sedmica").innerHTML = "";
        for (let i = 0; i < 7; i++) {
            if (preostalo > 0) {
                document.getElementById("sesta-sedmica").innerHTML += generisiCeliju(brojDana - preostalo + 1, "slobodnaSala");
                preostalo--;
            }
            else {
                document.getElementById("sesta-sedmica").innerHTML += praznaCelija;
            }
        }
        Kalendar.obojiZauzeca(
            "vanjska",
            Mjesec.trenutniMjesec(),
            document.getElementById("odabranaSala").value,
            "12:00",
            "14:00");
    }


    return {
        obojiZauzeca: obojiZauzecaImpl,
        ucitajPodatke: ucitajPodatkeImpl,
        iscrtajKalendar: iscrtajKalendarImpl,
    }
}());

function crtaj() {
    Kalendar.iscrtajKalendar(document.getElementById("vanjska"), Mjesec.trenutniMjesec());
}
function dugmeSljedeci() {
    Kalendar.iscrtajKalendar(document.getElementById("vanjska"), Mjesec.sljedeci());
}
function dugmePrethodni() {
    Kalendar.iscrtajKalendar(document.getElementById("vanjska"), Mjesec.prethodni());
}
Kalendar.iscrtajKalendar(document.getElementById("vanjska"), Mjesec.trenutniMjesec());