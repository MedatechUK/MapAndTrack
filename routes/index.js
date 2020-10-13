var express = require('express');
var router = express.Router();
var fs = require("fs");
const request = require("request-promise");
const { resolveInclude } = require('ejs');


/* GET home page. */
router.get('/', async function(req, res, next) {
    let data = [];
    
    var options = {
        method: 'get',
        url: "http://erp-test.optimaxonline.com:31333/maps",
        headers: { 
        'Authorization': 'Basic QXBpVXNlcjphcGk='
        }
      };
    let result = await request(options)
    let jsonSV = JSON.parse(result);
    processData(jsonSV);

    function processData(SVS){
        data = SVS;
    }

    res.render('index', {serviceVisits: "SOME DATA"});
});

function processData(data){
    var serviceCalls = data['value'].map(function (serviceCall, index) {
        let sc = {
            id: index,
            user: serviceCall.USERLOGIN,
            svNumber: serviceCall.SVNUM,
            customerName: serviceCall.CUSTDES,
            customerNumber: serviceCall.CUSTNAME,
            address1: serviceCall.ADDRESS,
            address2: serviceCall.ADDRESS2,
            city: serviceCall.CITY,
            zip: serviceCall.ZIP,
            position: {
                lat: serviceCall.GPSX,
                lng: serviceCall.GPSY
            },
            curDate: serviceCall.CURDATE,
            startDate: serviceCall.ZOPT_SDATE,
            endDate: serviceCall.ZOPT_EDATE,
            status: serviceCall.status,
            serviceHours: serviceCall.ZOPT_SERVICEHOURS,
            serviceMins: serviceCall.ZOPT_SERVICEMINS,
            group: serviceCall.GROUPNAME,
            part:[],
            sv:[],
            engineers: [],
            icon: '',
        }
        return sc
    })

    var uniqueServiceCalls = {};
    var nexServiceCall = {};
    for(const sc in serviceCalls){

    }
    return uniqueServiceCalls
}

module.exports = router;
