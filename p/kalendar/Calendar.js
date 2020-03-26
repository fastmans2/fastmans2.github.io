class Calendar{
    constructor(myData){
        this.data = JSON.parse(myData);
        this.div = document.createElement("div");
        this.div.className = "content_calendar";
        this.days = new Array(this.data.brojDana);
        for (let i = 0; i < this.data.prviDan-1; i++) {
            let day_div = document.createElement("div");
            this.div.append(day_div);
        }
        for (let i = 0; i < this.data.brojDana; i++) {
            let day_div = document.createElement("div");
            day_div.classList += "content_calendar_entry";
            let h1 = document.createElement("h1");
            h1.innerHTML=i+1;
            day_div.append(h1);
            let innerDiv = document.createElement("div");
            day_div.append(innerDiv);
            this.days[i] = innerDiv;
            this.div.append(day_div);
        }
    }
    AddDate(myData){
        let tempData = JSON.parse(myData);
        let h2 = document.createElement("h2");
        h2.innerHTML = tempData.predmet;
        h2.onclick=() => window.location.href = tempData.clickUrl;
        if(tempData.time!=undefined){
            h2.title = tempData.time;
        }
        this.days[tempData.day-1].append(h2);
        switch(this.days[tempData.day-1].children.length){
            case 1: this.days[tempData.day-1].className = "day_single";break;
            case 2: this.days[tempData.day-1].className = "day_double";break;
            case 3: this.days[tempData.day-1].className = "day_triple";break;
            case 4: this.days[tempData.day-1].className = "day_quad";break;
        }
        
        
    }

}