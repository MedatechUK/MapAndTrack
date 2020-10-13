var express = require('express');
var cors = require('cors');
var router = express.Router();
var fs = require("fs");
//var axios = require(axios);

/* GET users listing. */
router.get('/',  cors(), function (req, res, next) {
    let error = false;
    let errorMessage = '';
    let usersLocationList = [];

    if (req.query.service === "login") {
        let dataIn = req.query;
        dataIn.serverTime = new Date();
        let dataToSave = JSON.stringify(dataIn);
        console.log(dataToSave);
        fs.writeFile('./public/locations/' + dataIn.username+'.json', dataToSave, "utf8",function(err) {
            console.log("Data saving...");
            if (err) {
                console.log(err);
            }else{
                console.log("Date saved!")
            }
        });
        res.send("Location Updated");
    } else if (req.query.service === "getUsers") {
        let userList = getFile('users.json');
        data = JSON.parse(userList);
        for(const i in data){
            for(const jk in data[i]){
                let userData = getFile(data[i][jk]);
                usersLocationList.push(JSON.parse(userData));
            }
            res.json(usersLocationList);
        }
     /*   //console.log(usersLocationList);
        res.json({data: usersLocationList});*/
    }

    function getFile(file) {
        return fs.readFileSync('./public/locations/'+file, 'utf8');
    }
});


module.exports = router;