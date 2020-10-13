class EngineersSkills {

    constructor(engineers) {
        this.username = engineers.USERDES;
        this.userid = engineers.USERLOGIN;
        this.address = engineers.ADDRESS;
        this.address1 = engineers.ADDRESS2;
        this.city = engineers.city;
        this.zip = engineers.zip;
        this.currentjob = {
            svnumber: engineers.currentjob,
            startDate: "01/01/2099",
            position: {
                lat: 0.0,
                lng: 0.0
            }
        };
        this.svnum = engineers.svnum;
        this.joblist = [];
        this.position = {
            lat: this.randomGPS("x"),
            lng: this.randomGPS("y")
        };
        this.home = {
            lat: this.randomGPS("x"),
            lng: this.randomGPS("y")
        }
        this.skill = engineers.SKILL;
        this.skilllist = [];
        this.onlinestatus = engineers.STATDES;
        this.marker = null;
        this.colour = engineers.COLOUR;
        console.log(this.colour)
    }

    toColor(num) {
        num >>>= 0;
        var b = num & 0xFF,
            g = (num & 0xFF00) >>> 8,
            r = (num & 0xFF0000) >>> 16;
        return "rgba(" + [r, g, b, 1].join(",") + ")";
    }

    getNextJob() {
        let lowestDate = '01/01/2020';
        for (const sm in allServiceMarkers) {
            console.log("Checking results");
            let smDate = new Date(allServiceMarkers[sm].startDate);
            let currentLowers = new Date(this.currentjob.startDate);
            if (smDate < currentLowers) {
                this.currentjob.svnumber = allServiceMarkers[sm].svnum;
                this.currentjob.startDate = allServiceMarkers[sm].startDate;
                this.currentjob.position = allServiceMarkers[sm].position;
                console.log(this.currentjob.position, allServiceMarkers[sm].position)
                console.log("Finding Next Job")
            }
        }
    }

    getAddress() {
        let address = this.address + ",<br> " + this.address1 + ",<br> " + this.city + ",<br> " + this.zip;
        return address;
    }

    createMarker() {
        var man = {
            //path: 'M10,0.562c-5.195,0-9.406,4.211-9.406,9.406c0,5.195,4.211,9.406,9.406,9.406c5.195,0,9.406-4.211,9.406-9.406C19.406,4.774,15.195,0.562,10,0.562 M10,18.521c-4.723,0-8.551-3.829-8.551-8.552S5.277,1.418,10,1.418s8.552,3.828,8.552,8.551S14.723,18.521,10,18.521',
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            fillColor: this.colour,
            fillOpacity: 1,
            scale: 5,
            strokeColor: 'orange',
            strokeWeight: 3
        };

        let m = new google.maps.Marker({
            id: this.id,
            position: this.position,
            username: this.username,
            title: this.username,
            label: this.username,
            color: this.colour,
            status: this.onlinestatus,
            icon: man,
            currentJob: this.currentjob,
            skill: this.skill,
            service: this.svnum,
            map: map
        })

        google.maps.event.addListener(m, "click", function () {

            console.log(marker);
            let infoWindow = new google.maps.InfoWindow({
                content: div.innerHTML
            });
            infoWindow.open(map, marker);
        });

        this.marker = m;
        return m;
    }

    randomGPS(xy) {
        if (xy === "x") {
            let x = ((Math.random() * 10) / 3) + 51.1;
            return x;
        } else {
            let y = ((Math.random() * 10) / 3) + -3.4;
            return y;
        }
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
        google.maps.event.addListener(m, "click", function () {
            m.setMap(null);
            //google.maps.event.clearListeners(m, "click");
        })
        this.homeMarker = m;
        return m;
    }
}