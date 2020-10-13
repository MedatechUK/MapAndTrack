function toggleEngineerMarker(engineersName){
    let el = document.getElementById('locate-'+engineersName);
    (el.classList.contains('text-success')) ? el.classList.remove('text-success'):el.classList.add('text-success');
    console.log(engineersName);
    if(!(engineersFilter.visibleEngineers.includes(engineersName.toLowerCase()))){
        console.log("1");
        engineersFilter.visibleEngineers.push(engineersName.toLowerCase());
    }else{
        console.log("2");
        engineersFilter.visibleEngineers = engineersFilter.visibleEngineers.filter(function (engineer) {
            return engineer !== engineersName.toLowerCase();
        })
    }
    engineersFilterRefresh()
}


function toggleEngineerHome(engineersName){
    let el = document.getElementById('home-'+engineersName);
    (el.classList.contains('text-success')) ? el.classList.remove('text-success'):el.classList.add('text-success');
    console.log(engineersName);
    if(!(engineersFilter.visibleHomes.includes(engineersName.toLowerCase()))){
        console.log("1");
        engineersFilter.visibleHomes.push(engineersName.toLowerCase());
    }else{
        console.log("2");
        engineersFilter.visibleHomes = engineersFilter.visibleHomes.filter(function (engineer) {
            return engineer !== engineersName.toLowerCase();
        })
    }

    engineersFilterRefresh()
}


function toggleEngineerRoute(engineersName){
    let el = document.getElementById('route-'+engineersName);
    (el.classList.contains('text-success')) ? el.classList.remove('text-success'):el.classList.add('text-success');
    console.log(engineersName);
    if(!(engineersFilter.visibleRoutes.includes(engineersName.toLowerCase()))){
        console.log("1");
        engineersFilter.visibleRoutes.push(engineersName.toLowerCase());
    }else{
        console.log("2");
        engineersFilter.visibleRoutes = engineersFilter.visibleRoutes.filter(function (engineer) {
            return engineer !== engineersName.toLowerCase();
        })
    }
    engineersFilterRefresh()
}


function engineersFilterRefresh(){
    console.log("Filter Refresh");
    for(const e in userSkillList){
        if(userSkillList[e].todayRoute && !(engineersFilter.visibleRoutes.includes(userSkillList[e].username.toLowerCase()))){
            console.log("hide route")
            userSkillList[e].directions.setMap(null)
        }else if (userSkillList[e].todayRoute && engineersFilter.visibleRoutes.includes(userSkillList[e].username.toLowerCase())){
            console.log("show route");
            console.log(userSkillList[e].directions)
            userSkillList[e].directions.setMap(map)
            engineersFilter.visibleRoutes.push(userSkillList[e].username.toLowerCase());
        }else if(!userSkillList[e].todayRoute && engineersFilter.visibleRoutes.includes(userSkillList[e].username.toLowerCase())){
            userSkillList[e].calculateAndDisplayRoute();
            //userSkillList[e].directions.setMap(map)
        }

        if(engineersFilter.visibleHomes.length > 0) {
            (engineersFilter.visibleHomes.includes(userSkillList[e].username.toLowerCase())) ? userSkillList[e].homeMarker.setMap(map) : userSkillList[e].homeMarker.setMap(null);
        }else{
            userSkillList[e].homeMarker.setMap(null)
        }

        if(engineersFilter.visibleEngineers.length > 0) {
            (engineersFilter.visibleEngineers.includes(userSkillList[e].username.toLowerCase())) ? userSkillList[e].marker.setMap(map) : userSkillList[e].marker.setMap(null);
        }else{
            userSkillList[e].marker.setMap(null)
        }
    }
}