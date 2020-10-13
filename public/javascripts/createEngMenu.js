function createEngMenu(controlDiv, map) {

    let comp = [];
    let eng = [];

    let controlUI = document.createElement("div");
    controlUI.style.backgroundColor = "#fff";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginBottom = "22px";
    controlDiv.appendChild(controlUI);


    let customerMenu = document.createElement("div");
    controlUI.appendChild(customerMenu);

    var customerStatusButtonsContainer = document.createElement("div");
    var tmp = document.createElement("div");



    for(const e in userSkillList) {

        let offline = '  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" fill="red" xmlns="http://www.w3.org/2000/svg">' +
            '               <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"/>' +
            '           </svg>';

        let online = ' <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle-fill" fill="green" xmlns="http://www.w3.org/2000/svg">' +
            '               <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>' +
            '           </svg>';

        let status = null;
        if(userSkillList[e].status === "Online"){
            status = online;
        }else{
            status = offline;
        }

        let x = '<div class="input-group input-group-sm mb-1">' +
            '  <div class="input-group-prepend">' +
            '    <span class="input-group-text">' +
            status +
            '    </span>' +
            '  </div>' +
            '    <input class="form-control" type="text" disabled value="' +
            userSkillList[e].username +
            '"/>' +
            '    <div class="input-group-append">' +
            '       <button id="locate-' +
             userSkillList[e].username +
            '" class="btn btn-primary button" onclick="toggleEngineerMarker(\'' + userSkillList[e].username + '\')">' +
            '           <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
            '               <path fill-rule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>' +
            '           </svg>  ' +
            '       </button>' +
            '       <button id="home-' +
            userSkillList[e].username +
            '"  class="btn btn-primary button" onclick="toggleEngineerHome(\'' + userSkillList[e].username + '\')">' +
            '           <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-house" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
            '               <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>' +
            '               <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>' +
            '           </svg>' +
            '       </button>' +
            '       <button id="route-' +
            userSkillList[e].username +
            '"  class="btn btn-primary button"' + ' onclick="toggleEngineerRoute(\'' + userSkillList[e].username + '\')">' +
            '           <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-truck" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
            '               <path fill-rule="evenodd" d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5v7h-1v-7a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5v1A1.5 1.5 0 0 1 0 10.5v-7zM4.5 11h6v1h-6v-1z"/>' +
            '               <path fill-rule="evenodd" d="M11 5h2.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5h-1v-1h1a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4.5h-1V5zm-8 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>' +
            '               <path fill-rule="evenodd" d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>' +
            '           </svg>' +
            '       </button>' +
            '   </div>' +
            '</div>';

        tmp.innerHTML += x;
        customerStatusButtonsContainer.appendChild(tmp);
    }

    customerMenu.appendChild(customerStatusButtonsContainer);
}
