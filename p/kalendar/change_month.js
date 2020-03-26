function ChangeMonth(broj){
    let myBroj = broj -1;
    for(let i = 0; i < 12; i++){
        if(i==myBroj){
            document.getElementById("month_nav").children[i].className="month_entry_selected";
        }else{
            document.getElementById("month_nav").children[i].className="month_entry";
        }
        
    }
    document.getElementById("content_main").innerHTML = "";
    document.getElementById("content_main").append(months[myBroj].div);
    localStorage.setItem("month",broj);
}

const month = localStorage.getItem("month");

if(month!=null){
    ChangeMonth(month);
}