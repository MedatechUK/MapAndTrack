class UserSkillsClass{

    constructor(user) {
        this.username = user.USERLOGIN;
        this.colour = '#880f0f';
        this.status = (Math.random() > .5) ? "Online" : "OffLine";
        this.skills = [
            {
                groupName: user.GROUPNAME,
                levelNumber: user.LEVELNUM,
                priorityNumber: user.PRIORITYNUM,
                skill:user.SKILL,
                skillCode:user.SKILLCODE,
                skillDes:user.SKILLDES,
                qw:user.SKILLDES
            }
        ];
        this.todayJobs = [];
        this.todayRoute = null;
        this.directions = null;
        this.allJobs = [];
        this.marker = null;
        this.homeMarker = null;
        this.position = {
            lat: 0.0,
            lng: 0.0
        };
        this.housePosition = {
            lat: 52.5,
            lng: -1.5
        }
    }

    toggleMarker(m){
        console.log("Toggle Marker - " + m.username);
        m.marker.setMap(m.marker.getMap() === null ? map : null);
    }


    //todo order jobs by date remember you have the date compare thing????


    addJob(serviceCallIn){
        let serviceCall = {
            order: null,
            docNo: serviceCallIn.serviceCallNumber ? serviceCallIn.serviceCallNumber : null,
            startDate: serviceCallIn.startDate ? serviceCallIn.startDate : null,
            endDate: serviceCallIn.endDate ? serviceCallIn.endDate : null,
            serviceHours: serviceCallIn.serviceHours ? serviceCallIn.serviceHours : null,
            serviceMins: serviceCallIn.serviceMins ? serviceCallIn.serviceMins : null,
            positionX: parseFloat(serviceCallIn.position.lat) ? parseFloat(serviceCallIn.position.lat): null,
            positionY: parseFloat(serviceCallIn.position.lng) ? parseFloat(serviceCallIn.position.lng): null
        };

        if(serviceCallIn.startDate !== null) {
            if (isToday(serviceCall.startDate)) {
                this.todayJobs.push(serviceCall);
            }else{
                this.allJobs.push(serviceCall);
            }
        }else{
            this.allJobs.push(serviceCall);
        }
    }

    sortJobs(){
        array.sort(function(a, b) {
            var c = new Date(a.date);
            var d = new Date(b.date);
            return c-d;
        });
    }


    createMarker() {
        let cnt = document.createElement("div");
        let infowindowContent = document.createElement("div");
        infowindowContent.innerHTML = '\n' +
            '<div class="container">\n' +
            '    <div class="row">\n' +
            '        <div class="col-6">\n' +
                        '<h4>'+
                            this.username +
                        '</h4>' +
                    '</div>' +
                 '</div>' +
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
            title: this.username,
            label: "",
            color: this.colour,
            map: null
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

    calculateAndDisplayRoute() {
        directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer({preserveViewport: true});
        if(this.todayRoute === null && this.username.toLowerCase() === "paul.barnett") {
            console.log("Getting Route")
            var waypoints = this.todayJobs.map(waypoint => {
                return {
                    location: new google.maps.LatLng(waypoint.positionX, waypoint.positionY),
                    stopover: false
                }
            });

            console.log(waypoints);
            let eName = this.username;
            let eColour = this.colour
            tmpDir = [];
            directionsService.route({
                origin: {
                    lat: this.position.lat,
                    lng: this.position.lng,
                },
                waypoints: waypoints,
                destination: {
                    lat: this.housePosition.lat,
                    lng: this.housePosition.lng
                },
                travelMode: 'DRIVING'

            }, function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                    console.log(response);
                    //directionsDisplay.setMap(map);
                    tmpDir = new google.maps.DirectionsRenderer({preserveViewport: true, suppressMarkers: true, polylineOptions: {
                            strokeColor: eColour}})
                    tmpDir.setDirections(response)
                    setUserDirections(eName);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }

    }


    setDirections(){
        if(tmpDir !== null){
            this.directions = new google.maps.DirectionsRenderer;
            this.directions = tmpDir;
            console.log("this.directions");
            console.log(this.directions);
            this.todayRoute = "true";
        }
    }

    createHomeMarker() {
        let cnt = document.createElement("div");
        let infowindowContent = document.createElement("div");
        infowindowContent.innerHTML = '\n' +
            '<div class="container">\n' +
            '    <div class="row">\n' +
            '        <div class="col-6">\n' +
            '           <h4>' +
                            this.username +
            '           </h4>' +
            '        </div>' +
            '   </div>' +
            '</div>';
        cnt.appendChild(infowindowContent);
        let house = "M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z";

        var goldStar = {
            //path: house,
            path: house,
            fillColor: "red",
            fillOpacity: 1,
            scale: 20,
            strokeColor: 'black',
            strokeWeight: 10
        };
        console.log(this.colour)
        let colour = "23%" + this.colour.substring(1,this.colour.length);
        console.log(colour);
        let m = new google.maps.Marker({
            icon: "/images/home-24.png",
            id: this.id,
            position: this.housePosition,
            title: this.username,
            label: "",
            color: this.colour,
            map: null
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
        this.homeMarker = m;
    }


    addSkill(user){
        var userSkill = {
            groupName: user.GROUPNAME,
            levelNumber: user.LEVELNUM,
            priorityNumber: user.PRIORITYNUM,
            skill:user.SKILL,
            skillCode:user.SKILLCODE,
            skillDes:user.SKILLDES
        }
        this.skills.push(userSkill)
    }


}
