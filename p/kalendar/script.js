class Calendar{
    constructor(){
        this.days = new Array(35);
        for(let i = 0; i<35;i++){
            this.days[i] = new Array();
        }
    }

    addEvent(event){
        this.days[event.day].push({"predmet":event.predmet});
    }

    showData(){
        this.days.forEach(element =>{
            element.forEach(element=>{
                console.log(element);
                
            });
        });
    }
}

document.onload = loadCalendars();

function loadCalendars(){
    let calendars = new Array();
    console.log(new Calendar());
    
    calendarData.forEach(element => {
        let data  = JSON.parse(element);
        if(calendars[data.month]==null){
            calendars[data.month]=new Calendar;
        }
        calendars[data.month].addEvent(data);
    });
    calendars.forEach(element =>{
        if(element!=null){
            element.showData();
        }
    })
    
}