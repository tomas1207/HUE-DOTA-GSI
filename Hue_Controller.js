var http = require("axios");
var config = require("./config.json");
var host = config.URL;
var user = config.TOKEN;
var DIM = config.MaxDim;

class Hue{
    constructor(turnLight,bri,huecolor,data) {
        this.data = data;
        this.model = {"on":turnLight,"hue": huecolor  , "bri":bri,}
    }
    

    static async getLights() {
        const rsp = await http.get(host + user +"/lights/"+config.lights);
        return new Hue(rsp["data"]["on"], rsp["data"]["bri"],rsp["data"]["hue"], rsp["data"]);
    }

    TurnOnlights(sinal,lights) {
        this.model.on = sinal;
        http.put(host + user +"/lights/"+ lights + "/state/",this.model).then(rsp =>{  
        }); 
    }
    
    dimLights(percentage,OnLights,lights){
        var dim = Math.round((percentage/100)*DIM);
        this.model.bri = dim;
        this.model.on = OnLights;
        http.put(host + user +"/lights/"+ lights + "/state/",this.model).then(rsp =>{  
        });
    }
    colorLights(color,lights,percentage, dim = 255){
        this.model.hue = (Math.round(color) + percentage) * 1000;
        this.model.bri = dim;
       
        http.put(host + user +"/lights/"+ lights + "/state",this.model).then(rsp =>{  
        });
    }

}

module.exports = Hue;