function createMapMenu(controlDiv, map) {

    let comp = [];

    //create a container div for our menu
    var controlUI = document.createElement("div");
    controlUI.style.backgroundColor = "#fff";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginBottom = "22px";
    controlDiv.appendChild(controlUI);


    let customerMenu = document.createElement("div");
    controlUI.appendChild(customerMenu);

    //create some buttons for unscheduled and engineers filer
    var customerDateButtonsContainer = document.createElement("div");
    var customerDateButtons = document.createElement("div");
    customerDateButtons.classList.add("btn-group", "d-flex", "mt-2", "mb-2");
    let btnUnSched = document.createElement("button");
    btnUnSched.textContent = "Unscheduled";
    btnUnSched.id = "status-unscheduled";
    btnUnSched.value = "unscheduled";
    btnUnSched.addEventListener("click", function(){
        this.classList.contains("btn-info") ? this.classList.remove("btn-info") : this.classList.add("btn-info");
        customerFilterOption['unscheduled'] = !(customerFilterOption.unscheduled);
        customerFilter();
        //defaultFilters(clickFilter)
    })
    btnUnSched.classList.add("btn", "btn-primary", "btn-sm", "w-100");
    customerDateButtons.appendChild(btnUnSched);

    let userFilter = document.createElement("button");
    userFilter.textContent = "User Filter";
    userFilter.id = "filter-userfilter";
    userFilter.value = "userfilter";
    userFilter.addEventListener("click", function(){
        this.classList.contains("btn-info") ? this.classList.remove("btn-info") : this.classList.add("btn-info");
        customerFilterOption['filter'] = !(customerFilterOption.filter);
        customerFilter();
        //defaultFilters(clickFilter)
    })
    userFilter.classList.add("btn", "btn-primary", "btn-sm", "w-100");
    customerDateButtons.appendChild(userFilter);


    customerDateButtonsContainer.appendChild(customerDateButtons);
    customerMenu.appendChild(customerDateButtonsContainer);


    //create date selectors
    let input = document.createElement("input");
    let einput = document.createElement("input");


    let sdRowDiv = document.createElement("div");
    sdRowDiv.classList.add("form-row");
    let sdTmpDiv = document.createElement("div");
    sdTmpDiv.classList.add("form-group", "col-md-12");
    sdRowDiv.appendChild(sdTmpDiv);
    let lbl = document.createElement("label");
    lbl.htmlFor = "startDate";
    lbl.textContent = "Start Date";
    sdTmpDiv.appendChild(lbl);
    //add event listener for when the user changes the date we update the filter
    input.addEventListener("change", function(){
        filterEnabled = true;
        //this.value is the values of the input box after a new date has been selected
        customerFilterOption["start"] = this.value;
        customerFilter();
    })
    input.type ="date";
    input.classList.add("form-control");
    input.name ="starDate";
    input.id ="starDate";
    sdTmpDiv.appendChild(input);
    //set the default date to today
    input.valueAsDate = new Date((today.getMonth() +1)+ "/" + (today.getDate())+ "/" + (today.getFullYear()));
    customerMenu.appendChild(sdRowDiv);


    let edRowDiv = document.createElement("div");
    edRowDiv.classList.add("form-row");
    let edTmpDiv = document.createElement("div");
    edTmpDiv.classList.add("form-group", "col-md-12");
    edRowDiv.appendChild(edTmpDiv);
    let lbl1 = document.createElement("label");
    lbl1.htmlFor = "endDate";
    lbl1.textContent = "End Date";
    edTmpDiv.appendChild(lbl1);
    einput.addEventListener("change", function(){
        filterEnabled = true;
        customerFilterOption["end"] = this.value;
        customerFilter();
        /*dateSearch['endDate'] = einput.value;
        defaultFilters("dates")*/
    })
    einput.type ="date";
    einput.classList.add("form-control");
    einput.name ="endDate";
    einput.id ="endDate";
    einput.valueAsDate = new Date((tomorrow.getMonth() +1)+ "/" + (tomorrow.getDate())+ "/" + (tomorrow.getFullYear()));
    edTmpDiv.appendChild(einput);

    customerMenu.appendChild(edRowDiv);

    let csRowDiv = document.createElement("div");
    csRowDiv.classList.add("form-row");
    let customerSelectContainer = document.createElement("div");
    customerSelectContainer.classList.add('form-group', 'col-md-12');
    csRowDiv.appendChild(customerSelectContainer);
    let lbl2 = document.createElement("label");
    lbl2.htmlFor = "selectCustomer";
    lbl2.textContent = "Customer's";
    customerSelectContainer.appendChild(lbl2);
    let selectCustomer = document.createElement("select");
    selectCustomer.id = "selectCustomer";
    selectCustomer.name = "selectCustomer";
    selectCustomer.classList.add("custom-select");
    let allOption = document.createElement("option");
    allOption.value = "all";
    allOption.text = "All Service Visits";
    allOption.defaultSelected = true;
    selectCustomer.appendChild(allOption);
    for(const sc in serviceCallList){
        //lbl time will be the user name
        if(!(comp.includes(serviceCallList[sc].serviceVisitNumber))){
            let option = document.createElement("option");
            option.value =serviceCallList[sc].serviceVisitNumber;
            option.text = serviceCallList[sc].serviceVisitNumber;
            selectCustomer.appendChild(option);
            comp.push(serviceCallList[sc].serviceVisitNumber);
        }
    }
    selectCustomer.addEventListener("change", function(){
        filterEnabled = true;
        let x = this.value;
        customerFilterOption['customer'] = x;
        customerFilter();

    })
    customerSelectContainer.appendChild(selectCustomer);
    customerMenu.appendChild(csRowDiv);

    var customerStatusButtonsContainer = document.createElement("div");
    var customerStatusButtons = document.createElement("div");
    customerStatusButtons.classList.add("btn-group", "d-flex", "mt-2", "mb-2");
    customerStatusButtonsContainer.appendChild(customerStatusButtons);

    for (let i = 0; i < uniqueStatus.length; i++) {


        let button = document.createElement("button");
        button.textContent = uniqueStatus[i];
        button.id = "status-" + uniqueStatus[i];
        button.value = uniqueStatus[i];
        button.addEventListener("click", function(){
            this.classList.contains("btn-info") ? this.classList.remove("btn-info") : this.classList.add("btn-info");
            if(!customerFilterOption['status'].includes(uniqueStatus[i])){
                filterEnabled = true;
                customerFilterOption['status'].push(uniqueStatus[i])
                customerFilter()
                return
            }
            customerFilterOption['status'] = customerFilterOption['status'].filter(function (status) {
                return status !== uniqueStatus[i];
            })
            customerFilter();
            //defaultFilters(clickFilter)
        })
        button.classList.add("btn", "btn-primary", "btn-sm", "w-100");
        customerStatusButtons.appendChild(button);
    }
    customerMenu.appendChild(customerStatusButtons);


    let customerSkillsContainer = document.createElement("div");
    let customerSkills = document.createElement("div");
    customerSkills.classList.add("btn-group", "d-flex", "d-block", "mb-2");
    customerSkillsContainer.appendChild(customerSkills);
    for (let i = 0; i < uniqueSkills.length; i++) {
        let button = document.createElement("button");
        button.textContent = uniqueSkills[i];
        button.value = uniqueSkills[i];
        button.id = "services-"+uniqueSkills[i];
        button.addEventListener("click", function(){
            filterEnabled = true;
            this.classList.contains("btn-info") ? this.classList.remove("btn-info") : this.classList.add("btn-info");
            if(!customerFilterOption['services'].includes(uniqueSkills[i])){
                customerFilterOption['services'].push(uniqueSkills[i])
                filterEnabled = true;
                customerFilter();
                return
            }
            customerFilterOption['services'] = customerFilterOption['services'].filter(function (status) {
                return status !== uniqueSkills[i];
            })
            customerFilter();
            //defaultFilters(clickFilter)
        })
        button.classList.add("btn", "btn-primary", "btn-sm", "w-100");
        customerSkills.appendChild(button);
    }
    //let b = createButton("No Status", "null", 'service')
    customerMenu.appendChild(customerSkillsContainer);

    let clearCustomerFilter = document.createElement("div");
    let clearCustomerSkills = document.createElement("div");
    clearCustomerSkills.classList.add("btn-group", "btn-group-toggle", "d-block", "mb-2");
    let clearFilter = document.createElement("button");
    clearFilter.textContent = "Reset Filter";
    clearFilter.name = "ResetFilter";
    clearFilter.id = "ResetFilter";



    clearFilter.addEventListener("click", function(){
        input.valueAsDate = new Date((today.getMonth() + 1)+ "/" + (today.getDate())+ "/" + (today.getFullYear()));
        einput.valueAsDate = new Date((tomorrow.getMonth() + 1)+ "/" + (tomorrow.getDate())+ "/" + (tomorrow.getFullYear()));
        for(const i in customerFilterOption.status){
            let el = "status-" + customerFilterOption.status[i];
            let btn = document.getElementById(el);
            if(btn.classList.contains("btn-info")) {
                btn.classList.remove("btn-info");
            }
        }

        let el = "status-" + "unscheduled";
        let btn = document.getElementById(el);
        if(btn.classList.contains("btn-info")) {
            btn.classList.remove("btn-info");
        }
        console.log(el);
        if(document.getElementById(el).classList.contains("btn-info")) el.classList.remove("btn-info");

        for(const i in customerFilterOption.services){
            let el = "services-" + customerFilterOption.services[i];
            let btn = document.getElementById(el);
            if(btn.classList.contains("btn-info")) {
                btn.classList.remove("btn-info");
            }
            console.log(el);
            if(document.getElementById(el).classList.contains("btn-info")) el.classList.remove("btn-info");
        }
        customerFilterOption = {
            startDate: new Date((today.getMonth() + 1)+ "/" + (new Date().getDate())+ "/" + (today.getFullYear())),
            endDate:  new Date((tomorrow.getMonth() +1)+ "/" + (today.getDate())+ "/" + (today.getFullYear())),
            customer : 'all',
            status : [],
            services: [],
            unscheduled: false,
            engineers: ["all"]
        };
        customerFilter();
    })

    clearFilter.classList.add("btn", "btn-primary", "btn-sm");
    clearCustomerSkills.appendChild(clearFilter);

    let hideServices = document.createElement("button");
    hideServices.textContent = "Hide All";
    hideServices.name = "";
    hideServices.id = "";
    hideServices.addEventListener("click", function(){
        for(const sm in allServiceMarkers){
            allServiceMarkers[sm].setMap(null)
        }
        for (const fm in filterServiceMarkers){
            filterServiceMarkers[fm].setMap(null)
        }
        for(const em in allEngineerMarkers){
            userSkillList[em].setMap(null)
        }
    })
    hideServices.classList.add("btn", "btn-primary", "btn-sm");
    clearCustomerSkills.appendChild(hideServices);
    clearCustomerFilter.appendChild(clearCustomerSkills);
    customerMenu.appendChild(clearCustomerFilter)


    let routesDiv = document.createElement("div");
    let routesDivGroup = document.createElement("div");
    routesDivGroup.classList.add("btn-group", "btn-group-toggle", "d-block", "mb-2");
    let btnGetRoutes = document.createElement("button");
    btnGetRoutes.textContent = "Get Routes";
    btnGetRoutes.name = "getRoutes";
    btnGetRoutes.id = "getRoutes";
    btnGetRoutes.addEventListener("click", function(){
        calculateAndDisplayRoute()
    })

}
