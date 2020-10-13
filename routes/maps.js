var express = require('express');
var cors = require('cors');
var router = express.Router();
var request = require('request') ;
var fs = require("fs");
const { isNullOrUndefined } = require('util');
/* GET home page. */

router.get('/', cors() ,function(req, res, next) {

    let x = [];
    
    var options = {
        method: 'get',
        url: "https://erp-test.optimaxonline.com/odata/Priority/tabula.ini/testmay/ZOPT_JAMESFORM",
        headers: { 
        'Authorization': 'Basic QXBpVXNlcjphcGk='
        }
      };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        response = JSON.parse(response.body);
        let jsonResponse = response['value'];
        processData(jsonResponse);

    });   
  
    function processData(SVS){
    
        res.json({ServiceCalls: SVS});
    }

});


module.exports = router;
