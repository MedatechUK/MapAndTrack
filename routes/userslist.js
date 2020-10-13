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
        url: "https://erp-test.optimaxonline.com//odata/Priority/tabula.ini/testmay/ZOPT_USERS",
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
  
    function processData(users){
        let y = [];
         for (const user in users) {
            const x = {
                USERNAME: users[user].USERNAME,
                USERLOGIN: users[user].USERLOGIN
            };
             console.log(users[user].USERNAME)
             y.push(x);
         }
         
        // // }
        // let dataIn = req.query;
        // dataIn.serverTime = new Date();
        // let dataToSave = JSON.stringify(dataIn);
        // console.log(dataToSave);
        
        saveData(y);
        res.json(y);
    }

    function saveData(customers) {

        let dataToSave = JSON.stringify(customers);
        fs.writeFile('public/locations/userlist.json', dataToSave, "utf8",function(err) {
            console.log("Data saving...");
            if (err) {
                console.log(err);
            }else{
                console.log("Date saved!")
            }
        });
    }




});



module.exports = router;
