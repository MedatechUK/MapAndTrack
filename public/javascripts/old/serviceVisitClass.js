class ServiceVisit {
    constructor(serviceCall) {
        this.id = serviceCall.SVNUM;
        this.service = serviceCall.MAINTDES;
        this.user = serviceCall.USERLOGIN;
        this.svnumber = serviceCall.SVNUM;
        this.customerName = serviceCall.CUSTDES;
        this.customerNumber = serviceCall.CUSTNAME;
        this.address = serviceCall.ADDRESS;
        this.address1 = serviceCall.ADDRESS2;
        this.city = serviceCall.CITY;
        this.zip = serviceCall.ZIP;
        this.position = {
            lat: (typeof (serviceCall.GPSX) === "object") ? this.randomGPS("x") : serviceCall.GPSX,
            lng: (typeof (serviceCall.GPSY) === "object") ? this.randomGPS("y") : serviceCall.GPSY
        };
        this.curDate = serviceCall.CURDATE;
        this.startDate = (serviceCall.ZOPT_SDATE === null) ? (new Date(Math.floor(Math.random() * 29)+ "/" + Math.floor(Math.random() * 12) + "/" +(2015 + Math.floor(Math.random() * 10)))): serviceCall.ZOPT_SDATE;
        this.endDate = (serviceCall.ZOPT_EDATE === null) ? new Date(): serviceCall.ZOPT_EDATE;
        this.status = serviceCall.STATDES;
        this.serviceHours = serviceCall.ZOPT_SERVICEHOURS;
        this.serviceMins = (parseInt(serviceCall.ZOPT_SERVICEMINS) % 60);
        this.group = serviceCall.GROUPNAME;
        this.colour = this.toColor(10000 * (parseInt(serviceCall.CUSTNAME) * 5));
        this.skills = [
            serviceCall.PART
        ];
        this.parts = [
            serviceCall.PART
        ];
        this.sv = [
            serviceCall.SV
        ];
        this.engineers = [];
        this.icon = '/images/icons';
        this.infowindow = null;
        this.click = null;
        this.rightclick = null;
        this.marker = null;
        this.homeMarker = null;
        this.homeMarkerPosition = {
            lat: (typeof (serviceCall.GPSX) === "object") ? this.randomGPS("x") : serviceCall.GPSX,
            lng: (typeof (serviceCall.GPSY) === "object") ? this.randomGPS("y") : serviceCall.GPSY
        }
        this.cnt = null;
    }

    getAddress(){
        let address = this.address + ",<br> " +this.address1 + ",<br> "  + this.city + ",<br> "  +this.zip;
        return address;
    }

    addEngineer(engineersName){
        if(engineersName !== null && engineersName !== undefined) {
            if (!(this.engineers.includes(engineersName))) {
                this.engineers.push(engineersName);
            }
        }
    }

    addPart(part){
        if(part !== null && part !== undefined) {
            if (!(this.parts.includes(part))) {
                this.parts.push(part);
            }
        }
    }

    addSkill(skill){
        if(skill !== null && skill !== undefined && !(this.skills.includes(skill))) this.skills.push(skill);
    }

    addService(service){
        if(service !== null && service !== undefined && this.service === null) this.service = service;
    }

    getEngineers(){
        return this.engineers;
    }

    createClick(){
        let marker = this.marker;
        let div = document.createElement("div");
        let cnt = this.cnt.toString();
        div.innerHTML = cnt;
        google.maps.event.addListener(marker, "click", function(){
            let selectMarkerInputBox = document.getElementById("selectedServiceMarker");
            selectMarkerInputBox.setAttribute('value', this.id.toString().toUpperCase());
            console.log(marker);
            let infoWindow = new google.maps.InfoWindow({
                content: div.innerHTML
            });
            infoWindow.open(map, marker);
        });

    }


    setDateIfNull(){
        this.endDate = new Date("1/1/3000");
    }
    getSimpleDate(dateIn, type){
        var newDate;
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
        }
    }

    createMarker() {
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
            id: this.id,
            username: this.user,
            customerName: this.customerName,
            position: this.position,
            title: this.customerName,
            svnum: this.svnumber,
            label: "",
            lblTime: this.customerName,
            color: this.colour,
            status: this.status,
            icon: goldStar,
            skill: this.skills,
            service: this.service,
            startDate: this.startDate,
            endDate: this.endDate,
            time: this.serviceHours + ":" + this.serviceMins,
            map: map
        })
        this.marker = m;
        return m;
    }



    createHomeMarker() {
        var m = new google.maps.Marker({
            id: this.customerNumber,
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
        let cnt = document.createElement("div");
        let infowindowContent = document.createElement("div");
        infowindowContent.innerHTML = '\n' +
            '<div class="container">\n' +
            '    <div class="row">\n' +
            '        <div class="col-6">\n' +
            '            <h4>Service Visit ' +
            this.svnumber +
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
            this.getEngineers() +
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
        var contentString = cnt.outerHTML;
        return contentString;
    }


    toColor(num) {
        num >>>= 0;
        var b = num & 0xFF,
            g = (num & 0xFF00) >>> 8,
            r = (num & 0xFF0000) >>> 16;
            //a = ( (num & 0xFF000000) >>> 24 ) / 255 ;
        return "rgba(" + [r, g, b].join(",") + ")";
    }

    hideMarker(){
        this.marker.setMap(null);
    }
}