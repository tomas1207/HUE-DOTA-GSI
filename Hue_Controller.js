var http = require("axios");
var config = require("./config.json");
var host = config.URL;
var user = config.TOKEN;
class Hue{
    constructor(turnLight,bri,data) {
        this.data = data;
        this.model = {"on":turnLight , "bri":bri}
    }
    

    static async getLights() {
        const rsp = await http.get(host + user +"/lights/");
        return new Hue(true, 255, rsp["data"]);
    }

    TurnOnlights(sinal,lights) {
        this.model.on = sinal;
        http.put(host + user +"/lights/"+ lights + "/state/",this.model).then(rsp =>{  
        }); 
    }
    
    dimLights(percentage,OnLights,lights){
        var dim =Math.round((percentage/100)*255);
        this.model.bri = dim;
        this.model.on = OnLights;
        http.put(host + user +"/lights/"+ lights + "/state/",this.model).then(rsp =>{  
        });
    }
}

module.exports = Hue;