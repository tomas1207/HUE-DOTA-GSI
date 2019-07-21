var dotaobj = require('./Dota_Info');
var d2gsi = require('dota2-gsi');
var Hue = require('./Hue_Controller');
var config = require("./config.json");
var server = new d2gsi();

server.events.on('newclient', async function(client) {
    var hue = await Hue.getLights();   
    console.log("New client connection, IP address: " + client.ip);
    if (client.auth && client.auth.token) {
        console.log("Auth token: " + client.auth.token);
    } else {
        console.log("No Auth token");
    }
    client.on('hero:health_percent', function(health) {
        dotaobj.herohealth = health;
    });
    client.on('hero:mana_percent', function(mana) {
        dotaobj.heromana = mana;
    });
    client.on('hero:level', function(level) {
        dotaobj.level = level;
    });
   
    client.on('map:isdaytime', function(time) {
        dotaobj.isdaytime = time;
    }); 

    setInterval(() => {
        if(dotaobj.herohealth <= 23){
           
        }else{
            hue.colorLights(config.HPCOLOR,config.lights,dotaobj.herohealth,100);
        }
    }, 100);

});
