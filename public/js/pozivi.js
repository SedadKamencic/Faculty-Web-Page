const Pozivi = (function() {
  function ucitajPodatkeImp() {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "http://localhost:8080/ucitajPodatke", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send();

    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        let odgovor = JSON.parse(ajax.response);
        let periodicna = odgovor.periodicna;
        let vandredna = odgovor.vandredna;
        Kalendar.ucitajPodatke(periodicna, vandredna);
        Kalendar.obojiZauzeca(
          "vanjska",
          Mjesec.trenutniMjesec(),
          document.getElementById("odabranaSala").value,
          document.getElementById("pocetak").value,
          document.getElementById("kraj").value
        );
      }
    };
  }
  function brojPosjetilacaImp() {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "http://localhost:8080/brojPosjetilaca", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send();

    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        let odgovor = JSON.parse(ajax.response);
        
        document.getElementById("brojChrome").innerHTML = odgovor.chrome;
        document.getElementById("brojFirefox").innerHTML = odgovor.firefox;
      }
    };
  }
  function brojRazlicitihIPAdresaImp() {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "http://localhost:8080/brojIPAdresa", true);
    ajax.setRequestHeader("Content-Type", "application/text");
    ajax.send();
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        let odgovor = ajax.responseText;

        document.getElementById("brojIPadresa").innerHTML = odgovor;
      }
    };
  }
  function RezervisiOdabraniTerminImp(sala, profesor, periodicna, pocetak, kraj, datum) {
      let objekat;
      let semestar;
      if(datum.getMonth() >1 && datum.getMonth() <5){
          semestar="ljetni";
      }
      else{
          semestar="zimski";
      }
      let dan = datum.getDay();
      if(dan===0){
          dan = 6;
      }
      else{
          dan = dan - 1;
      }
      if(periodicna){
        objekat={
            dan: dan,
            semestar: semestar,
            pocetak: pocetak,
            kraj: kraj,
            naziv: sala,
            predavac: "Neko Nekic"
        }
      }
      else{
        datum = "" + datum.getFullYear() + "-" + (datum.getMonth()+1) + "-" + datum.getDate();
        objekat={
            datum: datum,
            pocetak: pocetak,
            kraj: kraj,
            naziv: sala,
            predavac: "Vandredni"
        }
      }

      ajax = new XMLHttpRequest();
      ajax.open("POST", "http://localhost:8080/rezervacijaSala", true);
      ajax.setRequestHeader("Content-Type", "application/json");
      ajax.send(JSON.stringify(objekat));
      ajax.onreadystatechange = function () {
          if(ajax.readyState==4 && ajax.status==200){
              let odgovor;
              try {
                odgovor = JSON.parse(ajax.response);
              } catch{
                alert(ajax.response);
                ucitajPodatkeImp();
              }
              let periodicna = odgovor.periodicna;
              let vandredna = odgovor.vandredna;
              Kalendar.ucitajPodatke(periodicna, vandredna);
              Kalendar.obojiZauzeca(
                "vanjska",
                Mjesec.trenutniMjesec(),
                document.getElementById("odabranaSala").value,
                document.getElementById("pocetak").value,
                document.getElementById("kraj").value
              );
          }
      }
  }
  function ucitajOsobeImp(){
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "http://localhost:8080/osoblje", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send();
    ajax.onreadystatechange = function(){
      if(ajax.readyState == 4 && ajax.status==200){
        let odgovor = JSON.parse(ajax.response);
        let dropBox = document.getElementById("osobeLista");
        odgovor.forEach(osoba => {
          novaOsoba = document.createElement("option");
          novaOsoba.id = "osoba" + osoba.id;
          novaOsoba.text = osoba.ime +" "+ osoba.prezime;
          novaOsoba.value = osoba.id;
          dropBox.add(novaOsoba);
        });
      }
    }
  }
  function ucitajSaleImp(){
    var ajax = new XMLHttpRequest();
    ajax.open("GET", "http://localhost:8080/sale", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send();
    ajax.onreadystatechange = function(){
      if(ajax.readyState == 4 && ajax.status==200){
        let odgovor = JSON.parse(ajax.response);
        let dropBox = document.getElementById("odabranaSala");
        odgovor.forEach(sala => {
          novaSala = document.createElement("option");
          novaSala.id = "sala" + sala.id;
          novaSala.text = sala.naziv;
          novaSala.value = sala.id;
          dropBox.add(novaSala);
        });
      }
    }    
  }
  function ucitajVrijemeImp(){
    let trenutnoVrijeme = new Date();
    let sati = trenutnoVrijeme.getHours();
    let minute = trenutnoVrijeme.getMinutes();
    let satKasnije = trenutnoVrijeme.setHours(trenutnoVrijeme.getHours()+1);
    let krajVrijeme = new Date(satKasnije);
    krajVrijeme = krajVrijeme.getHours();
    if(sati<10){
      sati='0'+sati;
    }
    if(krajVrijeme<10){
      krajVrijeme='0'+krajVrijeme;
    }
    if(minute<10){
      minute='0'+minute;
    }
    document.getElementById("pocetak").value=sati+":"+minute;
    document.getElementById("kraj").value=krajVrijeme+":"+minute;
  }
  return {
    ucitajPodatke: ucitajPodatkeImp,
    ucitajVrijeme: ucitajVrijemeImp,
    ucitajOsobe: ucitajOsobeImp,
    ucitajSale: ucitajSaleImp,
    brojPosjetilaca: brojPosjetilacaImp,
    brojRazlicitihIPAdresa: brojRazlicitihIPAdresaImp,
    RezervisiOdabraniTermin: RezervisiOdabraniTerminImp
  };
})();