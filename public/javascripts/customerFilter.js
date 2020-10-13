function customerFilter(){
    //if (customerFilterOption.start > customerFilterOption.end) return;
    filterEnabled = true;
    //Setup dates
    let startDateIn = new Date(customerFilterOption.start);
    let endDateIn = new Date(customerFilterOption.end);
    tmpFilter = [];

    //each section in this file will loop through the service calls and check if the data is relevant to the
    // filter option selected
    for (const sc in serviceCallList) {
        serviceCallList[sc].marker.setMap(null);
        let scStartDate = new Date(serviceCallList[sc].startDate);
        //check what filter we are using for the date either date or unscheduled
        if (!(customerFilterOption.unscheduled)) {
            //compare dated
            if (scStartDate >= startDateIn && scStartDate <= endDateIn && startDateIn <= endDateIn) {
                    tmpFilter.push(serviceCallList[sc])
            }
            //this needs to be altered as we check on date currently and this should be done on serviceCallList[sc].scheduled not start date
            //TODO scheduled not start date
        } else if (customerFilterOption.unscheduled && serviceCallList[sc].startDate === null) {
            tmpFilter.push(serviceCallList[sc])
        }
    }

    filterServiceMarkers = tmpFilter;
    tmpFilter = [];

    for (const fsm in filterServiceMarkers) {
        if (customerFilterOption.status.length !== 0) {
            if (customerFilterOption.status.includes(filterServiceMarkers[fsm].status)) tmpFilter.push(filterServiceMarkers[fsm]);
        } else {
            tmpFilter.push(filterServiceMarkers[fsm]);
        }
    }

    console.log(tmpFilter)
    filterServiceMarkers = tmpFilter;
    tmpFilter = [];

    for(const fsm in filterServiceMarkers){
        if(customerFilterOption.customer !== "all") {
            if (customerFilterOption.customer === filterServiceMarkers[fsm].serviceVisitNumber) tmpFilter.push(filterServiceMarkers[fsm]);
        }else {
            tmpFilter.push(filterServiceMarkers[fsm]);
        }
    }

/*
    filterServiceMarkers = tmpFilter;
    tmpFilter = [];
*/

/*    for(const us in userSkillList){
        if(customerFilterOption.engineers.length === 0) {
            if (customerFilterOption.engineers.includes(userSkillList[us].username)) {
                userSkillList[us].marker.setMap(map);
            } else {
                userSkillList[us].marker.setMap(null)
            }
        }else{
            userSkillList[us].marker.setMap(map)
        }
    }*/


    filterServiceMarkers = tmpFilter;
    tmpFilter = [];
    for(const fsm in filterServiceMarkers){
        if(customerFilterOption.services.length !== 0) {
            if(customerFilterOption.services.includes(filterServiceMarkers[fsm].service)) tmpFilter.push(filterServiceMarkers[fsm]);
        }else {
            tmpFilter.push(filterServiceMarkers[fsm]);
        }
    }


    filterServiceMarkers = tmpFilter;

    for (const fsm in filterServiceMarkers){
        filterServiceMarkers[fsm].marker.setMap(map);
    }

}