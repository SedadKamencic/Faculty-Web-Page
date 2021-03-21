window.onload = function(){
    Pozivi.ucitajPodatke();
    Pozivi.ucitajOsobe();
    Pozivi.ucitajSale();
    Pozivi.ucitajVrijeme();
}

function rezervisiSalu(ref){
    let status = ref.getElementsByClassName("zauzetaSala")[0];
    if(status){
        alert("Ova sala je zauzeta u datom terminu");
        return;
    }
    else{
        let salaId = document.getElementById("odabranaSala").value;
        let profesorId = document.getElementById("osobeLista").value;
        let periodicna = document.getElementById("periodicna").checked;
        let pocetak = document.getElementById("pocetak").value;
        let kraj = document.getElementById("kraj").value;
        let mjesec = document.getElementById("imeMjeseca").innerHTML.toLocaleLowerCase();
        
        if(pocetak=="" || kraj==""){
            alert("Niste unijeli vrijednost za pocetak ili kraj termina");
            return;
        }
        let odgovor =confirm("Da li ste sigurni da zelite rezervisati ovaj termin?");
        if(odgovor){
            mjesec = Mjesec.mjesecUBroj(mjesec);
            let odabraniDan = ref.getElementsByClassName("broj")[0].innerHTML;
            let godina = new Date().getYear;
            let datum = new Date(godina, mjesec, odabraniDan);
            Pozivi.RezervisiOdabraniTermin(salaId,profesorId, periodicna, pocetak, kraj, datum);
        }
    }
}