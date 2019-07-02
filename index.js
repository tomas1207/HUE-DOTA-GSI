var dotaobj = require('./Dota_Info');
var d2gsi = require('dota2-gsi');
var Hue = require('./Hue_Controller');
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

    dotaobj.herohealth = client.gamestate.hero.health_percent;
    dotaobj.heromana = client.gamestate.hero.mana_percent;
    dotaobj.level = client.gamestate.hero.level;
    dotaobj.isdaytime = client.gamestate.map.isdaytime;

    setInterval(() => {
        if(dotaobj.herohealth <= 23){
            hue.dimLights(null,false,3);
        }else{
            hue.dimLights(dotaobj.herohealth,true,3);
        }

    }, 100);

});
