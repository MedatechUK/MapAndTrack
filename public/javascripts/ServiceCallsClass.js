class ServiceCallsClass {
    constructor(serviceCall) {
        this.id = serviceCall.DOCNO;
        this.serviceCallNumber = serviceCall.DOCNO;
        this.serviceVisitNumber = serviceCall.SVNUM;
        this.engineer = [serviceCall.USERLOGIN];
        this.service = serviceCall.MAINTDES;
        this.customerName = serviceCall.CUSTDES;
        this.customerNumber = serviceCall.CUSTNAME;
        this.address = serviceCall.ADDRESS;
        this.address1 = serviceCall.ADDRESS2;
        this.city = serviceCall.CITY;
        this.zip = serviceCall.ZIP;
        this.position = {
            lat: (typeof (serviceCall.GPSX) === null) ? this.randomGPS("x") : serviceCall.GPSX,
            lng: (typeof (serviceCall.GPSY) === null) ? this.randomGPS("y") : serviceCall.GPSY
        };
        this.curDate = serviceCall.CURDATE;
        this.startDate = serviceCall.ZOPT_SDATE;
        this.endDate = serviceCall.ZOPT_EDATE;
        this.status = serviceCall.STATDES;
        this.serviceHours = serviceCall.ZOPT_SERVICEHOURS;
        this.serviceMins = (parseInt(serviceCall.ZOPT_SERVICEMINS) % 60);
        this.time = serviceCall.ZOPT_SERVICEHOURS + ":" + (parseInt(serviceCall.ZOPT_SERVICEMINS) % 60)
        this.group = serviceCall.GROUPNAME;
        this.colour = '#FFCC33';
        this.skills = serviceCall.MAINTDES;
        this.parts = serviceCall.PARTDES;
        this.icon = '/images/icons';
        this.infowindow = null;
        this.marker = null;
        this.infoCnt = null;
        this.homeMarker = null;
        this.homeMarkerPosition = {
            lat: (typeof (serviceCall.GPSX) === "object") ? this.randomGPS("x") : serviceCall.GPSX,
            lng: (typeof (serviceCall.GPSY) === "object") ? this.randomGPS("y") : serviceCall.GPSY
        }
    }

    createMarker(user) {
        let cnt = document.createElement("div");
        let infowindowContent = document.createElement("div");
        infowindowContent.innerHTML = '\n' +
            '<div class="container">\n' +
            '    <div class="row">\n' +
            '        <div class="col-6">\n' +
            '            <h4>Service Visit ' +
            this.id +
            '</h4>\n' +
            '            <h6>\n' +
            '                <a href="">Company Name - 100001</a><br>\n' +
            this.getAddress() +
            '            </h6>\n' +
            '            <h6>Start Date :<small>' +
            this.startDate +
            '</small></h6>\n' +
            '            <h6>End Date :<small>' +
            this.startDate   +
            '</small></h6>\n' +
            '        </div>\n' +
            '        <div class="col-6">\n' +
            '            <h5>Engineers Assigned</h5>\n' +
            '            <p>\n' +
            this.engineer +
            '            </p>\n' +
            '            <h5>Suitable Engineers</h5>\n' +
            '            <p>\n' +
            '                Engineer three - skill <br>\n' +
            '                Engineer four - skill <br>\n' +
            '            </p>\n' +
            '            <h5>Parts</h5>\n' +
            '            <p>\n' +
            this.parts +
            '            </p>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '    <div class="col-12">' +
            // '<button class="btn btn-primary btn-sm" onclick="hideServiceMarker()">Hide Marker</button>' +
            '</div>\n' +
            '</div>';
        cnt.appendChild(infowindowContent);


        var goldStar = {
            //path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: this.colour,
            fillOpacity: 0.8,
            scale: 15,
            strokeColor: 'black',
            strokeWeight: 3
        };

        let m = new google.maps.Marker({
            icon: goldStar,
            id: this.id,
            position: this.position,
            title: this.customerName,
            label: "",
            color: this.colour,
            time: this.time,
            map: map
        })
        let div = document.createElement('div');
        div.textContent = this.id;
        google.maps.event.addListener(m, "click", function(){
            let tmpDiv = document.createElement("div");
            let infoWindow = new google.maps.InfoWindow({
                content: cnt.outerHTML
            });
            infoWindow.open(map, m);
        });
        this.marker = m;
    }

    getAddress(){
        let address = this.address + ",<br> " +this.address1 + ",<br> "  + this.city + ",<br> "  +this.zip;
        return address;
    }

    addSkill(skill){
        if(skill !== null && skill !== undefined && !(this.skills.includes(skill))) this.skills.push(skill);
    }

    setEasyDateTime(dateIn, type){
        let year, month, day = 0;
        if(type === "S"){
            if(dateIn !== null && dateIn !== undefined) {
                let tmpArr = dateIn.split("T");
                let dIn = (tmpArr[0].length === null) ? null : tmpArr[0];
                if (dIn.length >= 10) {
                    year = dIn.substring(0, 4);
                    month = dIn.substring(5, 7);
                    day = dIn.substring(8, 10);
                }
                let tIn2 = (tmpArr[1].length === null) ? null : (tmpArr[1].length > 8) ? tmpArr[1].substring(0, 8) : tmpArr[1];
                let tIn = new Date([year, month, day, tIn2].join('/'));
                this.startDate = tIn;
            }
            }else if(type === "E"){
            if(dateIn !== null && dateIn !== undefined) {
                let tmpArr = dateIn.split("T");
                let dIn = (tmpArr[0].length === null) ? null : tmpArr[0];
                if (dIn.length >= 10) {
                    year = dIn.substring(0, 4);
                    month = dIn.substring(5, 7);
                    day = dIn.substring(8, 10);
                }
                let tIn2 = (tmpArr[1].length === null) ? null : (tmpArr[1].length > 8) ? tmpArr[1].substring(0, 8) : tmpArr[1];
                let tIn = new Date([year, month, day, tIn2].join('/'));
                this.endDate = tIn;
            }
        }
/*        var newDate;
        if(dateIn === null){
            if(type === "s"){
                newDate = new Date(2000);
                this.startDate = newDate;
                return newDate;
            }else if(type === "e"){
                newDate = new Date(2999);
                this.endDate = newDate;
                return newDate;
            }
        }*/
    }



    createHomeMarker() {

        var icon = {

            path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
            fillColor: '#FF0000',
            fillOpacity: .6,
            anchor: new google.maps.Point(0,0),
            strokeWeight: 0,
            scale: 1
        }

        var m = new google.maps.Marker({
            id: this.customerNumber,
            icon: icon,
            position: this.homeMarkerPosition,
            title: this.customerName,
            label: this.customerName,
            color: this.colour,
            map: null
        });
        google.maps.event.addListener(m, "click", function() {
            m.setMap(null);
            //google.maps.event.clearListeners(m, "click");
        })
        this.homeMarker = m;
        return m;
    }

    randomGPS(xy) {
        if (xy === "x") {
            let x = ((Math.random() * 10) / 3) + 51.1;
            return x;
        } else {
            let y = ((Math.random() * 10) / 3) + -3.4;
            return  y;
        }
    }

    createCntString(){
        return contentString;
    }

}