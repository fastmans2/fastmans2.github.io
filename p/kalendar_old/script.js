function unknown(data){
    let h1 = document.createElement("h1");
    h1.className = "dateUnknown";
    h1.innerHTML = data.predmet;
    h1.onclick=() => window.location.href = data.clickUrl;
    document.getElementById("unknownEntries").appendChild(h1);

}

class Calendar{
    constructor(month){
        console.log(month);
        this.data = JSON.parse(month)
        this.calendar_div = document.createElement("div");
        this.calendar_div.classList+="calendar";
        this.day_divs = new Array(35);
        this.day_count = 0;
        document.getElementById("displayDiv").appendChild(this.calendar_div);
        for(let i = 0; i<40;i++){

            
            console.log(parseInt(this.data.prviDan)+parseInt(this.data.brojDana));
            
            if(i+1>=(parseInt(this.data.prviDan)+parseInt(this.data.brojDana)))break;
            let div = document.createElement("div");
            div.style.gridColumn=(i+1)%7;
            
            this.calendar_div.appendChild(div);
            if(i+1>=this.data.prviDan){
                div.classList+="date";
                this.addDate(div);
            }
        }
        
        
        this.days = new Array(35);
        for(let i = 0; i<35;i++){
            this.days[i] = new Array();
        }
    }

    addDate(div){
        this.day_divs[this.day_count] = div;
        let h1 = document.createElement("h1");
        h1.innerHTML=this.day_count+1;
        
        
        this.day_divs[this.day_count].appendChild(h1);
        this.day_count++;
    }

    addEvent(event){
        let h2 = document.createElement("h2");
        h2.innerHTML = event.predmet;
        h2.onclick=() => window.location.href = event.clickUrl;
        if(event.time!=undefined){
            h2.title = event.time;
        }

        this.day_divs[event.day-1].appendChild(h2);
        if(this.day_divs[event.day-1].children.length==2){
            this.day_divs[event.day-1].children[1].className="dateh1single";
            
        }
        else if(this.day_divs[event.day-1].children.length==3){
            this.day_divs[event.day-1].children[1].className="dateh1double";
            this.day_divs[event.day-1].children[2].className="dateh1double";
        }
        else if(this.day_divs[event.day-1].children.length==4){
            this.day_divs[event.day-1].children[1].className="dateh1triple";
            this.day_divs[event.day-1].children[2].className="dateh1triple";
            this.day_divs[event.day-1].children[3].className="dateh1triple";
        }
        
    }

    showData(){
        this.days.forEach(element =>{
            element.forEach(element=>{
                console.log(element);
                
            });
        });
    }
}
let calendars = new Array();
window.onload = loadCalendars();


function loadCalendars(){
    document.getElementById("calendarHeader").style.display = "hidden";
    for(let i=0;i<12;i++){
        calendars[i] = new Calendar(monthData[i]);
    }
    calendarData.forEach(element => {
        let data  = JSON.parse(element);
        calendars[data.month-1].addEvent(data);
    });
    unknownData.forEach(element => {
        let data  = JSON.parse(element);
        unknown(data);
    });
    changeCalendar(2);
}

function changeCalendar(num){
    for(let i=0;i<12;i++){
        document.getElementById("datesId").children[i].className="dateText";
    }
    while (document.getElementById("displayDiv").firstChild) {
        document.getElementById("displayDiv").removeChild(document.getElementById("displayDiv").lastChild);
    }
    document.getElementById("calendarHeader").style.display = "none";
    console.log(calendars[num]);
    
    if(calendars[num]!=undefined){
        document.getElementById("datesId").children[num].className="dateTextSelected";
        document.getElementById("calendarHeader").style.display = "grid";
        document.getElementById("displayDiv").appendChild(calendars[num].calendar_div);
    }
}