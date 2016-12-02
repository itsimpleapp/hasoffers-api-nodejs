"use strict";

const url = require("url"),
      request = require("request");

module.exports = function(apikey, networkid){
    return {
        /**
         * Function to generate the API request
         *
         * @param string URL 
         * @param function cb
         */
        getinapi: function(URL, cb) {   
            request(URL, (error, response, body) => { 
                if(body)
                    body = JSON.parse(body);
                
                cb(error, body.response.data); 
            });
        },
        
        /**
         * Function to generate application link
         *
         * @see http://stackoverflow.com/questions/22678346/convert-javascript-object-to-url-parameters
         * @param string URLbase
         * @param object params
         * @return string
         */
        createurl: function(URLbase, params) {
            let paramsStr = Object.keys(params).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
            }).join('&');

            return URLbase + ((URLbase.indexOf("?") >= 0) ? "" : "?") + paramsStr;
        },
        
        /**
         * Function to encode URL
         * 
         * @see http://locutus.io/php/url/urlencode/
         * @param str
         * @return str
         */
        urlencode: function(str){
            str = (str + '');
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+')
        },
        
        /**
         * Get your profile information
         * 
         * @see http://developers.hasoffers.com/#/affiliate/controller/Affiliate_AffiliateUser/method/findAll
         * @param function cb
         */
        profile: function(cb) {
            this.getinapi("https://api.hasoffers.com/Apiv3/json?NetworkId=" + networkid + "&Target=Affiliate_AffiliateUser&Method=findAll&api_key=" + apikey, cb);
        },
        
        /**
         * Get advertiser programs
         *
         * @see http://developers.hasoffers.com/#/affiliate/controller/Affiliate_Offer/method/findAll
         * @param object params         *
         * filters: Field-level filters to restrict which Offers are returned.
         * sort: Sort by fields and directions 'desc' or 'asc'.
         * limit: Limit the number of items returned per page.
         * page: Page by the limit of items returned. Defaults to page 1.
         * fields: Which fields to return on the matching Offers. If not specified, returns all fields.
         * @param function cb
         */
        programs: function(params, cb) {
            var URL = this.createurl("https://api.hasoffers.com/Apiv3/json?NetworkId=" + networkid + "&Target=Affiliate_Offer&Method=findAll&api_key=" + apikey, params);
            this.getinapi(URL, cb);
        },
        
        /**
         * Returns basic statistics of clicks, views, leads and sales
         * 
         * @see http://developers.hasoffers.com/#/affiliate/controller/Affiliate_Report/method/getStats
         * @param string datestart Query start date in AAAA-MM-DD format
         * @param string dateend Query end date in AAAA-MM-DD format
         * @param function cb
         */
        reportbasic: function(datestart, dateend, cb) {
            this.getinapi("https://api.hasoffers.com/Apiv3/json?NetworkId=" + networkid + "&Target=Affiliate_Report&Method=getStats&api_key=" + apikey + "&fields%5B%5D=Stat.clicks&fields%5B%5D=Stat.conversions&fields%5B%5D=Stat.date&fields%5B%5D=Stat.impressions&fields%5B%5D=Stat.payout&groups%5B%5D=Stat.date&data_start=" + datestart + "&data_end=" + dateend, cb);
        },
                
        /**
         * Returns full statistics of clicks, views, leads and sales
         * 
         * @see http://developers.hasoffers.com/#/affiliate/controller/Affiliate_Report/method/getStats
         * @param string datestart Query start date in AAAA-MM-DD format
         * @param string dateend Query end date in AAAA-MM-DD format
         * @param function cb
         */
        report: function(datestart, dateend, cb){
            this.getinapi("https://api.hasoffers.com/Apiv3/json?NetworkId=" + networkid + "&Target=Affiliate_Report&Method=getStats&api_key=" + apikey + "&fields%5B%5D=Offer.name&fields%5B%5D=Stat.clicks&fields%5B%5D=Stat.conversions&fields%5B%5D=Stat.date&fields%5B%5D=Stat.impressions&fields%5B%5D=Stat.payout&groups%5B%5D=Offer.name&groups%5B%5D=Stat.date&data_start=" + datestart + "&data_end=" + dateend, cb);
        },
        
        /**
         * Create tracking links
         * 
         * @see http://developers.hasoffers.com/#/affiliate/controller/Affiliate_Offer/method/generateTrackingLink
         * @param string url
         * @param integer storeid
         * @return void
         */
        deeplink: function(url, storeid, cb){
            var _this = this;
            
            request("https://api.hasoffers.com/Apiv3/json?NetworkId=" + networkid + "&Target=Affiliate_Offer&Method=generateTrackingLink&api_key=" + apikey + "&offer_id=" + storeid + "&params%5Burl%5D="+this.urlencode(url), (error, response, body) => { 
                if(error){
                    cb(error, null);
                }
                else{                    
                    var contentsJSON = JSON.parse(body);  
                    
                    if (contentsJSON.response == null)
                        cb({"msg": "Error connecting to Has Offers."}, "");    
                    else if(contentsJSON.response.data["click_url"] !== "")
                        cb(false, contentsJSON.response.data["click_url"]);         
                    else
                        cb({"msg": "Invalid link to this program."}, "");  
                }
            });
        }
    }
}
