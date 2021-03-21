const http = require('http');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-Parser');
const path = require('path');
const db = require('../../baza/db.js');

const app = express();
const port = 8080;
const hostName = "127.0.0.1";
const glavnaPutanja = path.join(__dirname, '../../');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(glavnaPutanja));

app.get('/', function(req, res){
    res.sendfile(glavnaPutanja + '/public/html/pocetna.html');
});
app.get('/ucitajPodatke', function (req, res) {
    res.sendFile(glavnaPutanja + '/app/json/zauzeca.json');
});
app.get('/osoblje', function(req, res) {
    db.osoblje.findAll().then(function(rezultat){
        res.send(rezultat);
    });
});
app.get('/sale', function(req, res){
    db.sala.findAll().then(function(rezultat){
        res.send(rezultat);
    });
});
app.get('/brojPosjetilaca', function (req, res) {
    let zahtjev = req.get("User-Agent");

    let data = fs.readFileSync(glavnaPutanja + '/app/json/userAgents.json')
    let file = JSON.parse(data);
    
    if(zahtjev.match("Chrome")){
        file.chrome++;
    }
    else if(zahtjev.match("Firefox")){
        file.firefox++;
    }
    fs.writeFileSync(glavnaPutanja + '/app/json/userAgents.json', JSON.stringify(file));
    
    res.sendFile(glavnaPutanja + '/app/json/userAgents.json');
});
app.get('/brojIPadresa', function (req, res) {
    let zahtjev = req.ip;
    console.log(zahtjev);
    let data = fs.readFileSync(glavnaPutanja + '/app/json/ipAdrese.json');
    let file = JSON.parse(data);

    let pronadjena = false;
    let brojAdresa = 0;
    file.ipAdrese.forEach(adresa => {
        if(adresa.match(zahtjev)){
            pronadjena = true;
        }
        brojAdresa++;
    });
    if(!pronadjena){
        file.ipAdrese.push(zahtjev);
    }
    fs.writeFileSync(glavnaPutanja + '/app/json/ipAdrese.json', JSON.stringify(file));
    res.end(""+brojAdresa);
});
app.post('/rezervacijaSala', function (req, res) {
    let zahtjev=req.body;

    let data = fs.readFileSync(glavnaPutanja + '/app/json/zauzeca.json');
    let file = JSON.parse(data);

    if(zahtjev.dan){
        file.periodicna.forEach(i =>{
            if(i.dan==zahtjev.dan && i.naziv==zahtjev.naziv && i.semestar == zahtjev.semestar && (i.pocetak>=zahtjev.pocetak && i.pocetak<=zahtjev.kraj)||(i.kraj >= zahtjev.pocetak && i.kraj <= zahtjev.kraj)){
                res.send("Nije moguće rezervisati salu "+ zahtjev.naziv + " za navedeni datum "+ zahtjev.dan +" i termin od "+ zahtjev.pocetak +" do "+ zahtjev.kraj +"!");
            }
        });
        file.periodicna.push(zahtjev);
    }
    else{
        file.vandredna.forEach(i =>{
            if(i.datum==zahtjev.datum && i.naziv==zahtjev.naziv && (i.pocetak>=zahtjev.pocetak && i.pocetak<=zahtjev.kraj)||(i.kraj >= zahtjev.pocetak && i.kraj <= zahtjev.kraj)){
                res.send("Nije moguće rezervisati salu "+ zahtjev.naziv + " za navedeni datum "+ zahtjev.datum +" i termin od "+ zahtjev.pocetak +" do "+ zahtjev.kraj +"!");
            }
        });
        file.vandredna.push(zahtjev);
    }
    fs.writeFileSync(glavnaPutanja + '/app/json/zauzeca.json', JSON.stringify(file));
    res.sendFile(glavnaPutanja + '/app/json/zauzeca.json');
});
app.listen(port);
console.log(`Server je pokrenut na adresi: ${hostName}:${port}.....`);