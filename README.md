# Has Offers API

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/andrehrf/hasoffers-api-nodejs/master/LICENSE)
[![npm version](https://badge.fury.io/js/hasoffers-api.svg)](https://badge.fury.io/js/hasoffers-api)

API integration with Has Offers

## Install

```bash
$ npm install hasoffers-api
```

## Get Api Key

* API Key - http://developers.hasoffers.com/#/affiliate
* Indexa Network - http://admin.indexanetwork.com/signup
* Weach - http://affiliates.weachgroup.com/signup
* Netshoes - http://netshoes.hasoffers.com/signup

## Usage

```js
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

```

## License

  MIT
  
  Copyright (C) 2016 André Ferreira

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.