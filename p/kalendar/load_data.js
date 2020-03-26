var months = new Array(12);

function AddToUnknown(data){
    let myUnknownData = JSON.parse(data);
    let h1 = document.createElement("h1");
    h1.className="sidebar_entry";
    h1.innerHTML = myUnknownData.predmet;
    h1.onclick=() => window.location.href = myUnknownData.clickUrl;
    document.getElementById("sidebar_content").append(h1);
}

//add calendars
for (let i = 0; i < 12; i++) {
    months[i] = new Calendar(monthData[i]);
}

//add dates
for (let i = 0; i < calendarData.length; i++) {
    months[(JSON.parse(calendarData[i]).month)-1].AddDate(calendarData[i]);
    
}


//add unknown data
for (let i = 0; i < unknownData.length; i++) {
    AddToUnknown(unknownData[i]);
}


