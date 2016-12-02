/**
 * Has Offers API interface for Node.js
 * 
 * @author André Ferreira <andrehrf@gmail.com>
 * @see API Key - http://developers.hasoffers.com/#/affiliate
 * @see Indexa Network - http://admin.indexanetwork.com/signup
 * @see Weach - http://affiliates.weachgroup.com/signup
 * @see Netshoes - http://netshoes.hasoffers.com/signup
 */

"use strict";

let HasOffers = require("./index.js"),
    hasoffers = new HasOffers("API Key", "Network ID");
    
hasoffers.profile((err, result) => {
    console.log(result);
});
    
hasoffers.programs({}, (err, result) => {
    console.log(result);
});
       
hasoffers.reportbasic("2016-11-01", "2016-11-30", (err, result) => {
    console.log(result);
});

hasoffers.deeplink("http://www.bololo.com.br/", "1020", (err, result) => {
    console.log(result);
});

