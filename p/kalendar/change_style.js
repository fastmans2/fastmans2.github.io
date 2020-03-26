const theme = localStorage.getItem("theme");

if(theme){
    document.body.className=theme;
}

function SetStyle(style){
    document.body.className=style;
    localStorage.setItem("theme",style)
}