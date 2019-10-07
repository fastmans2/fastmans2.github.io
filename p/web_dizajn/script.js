function hideQuestion(number) {
  if(document.getElementById("hiddenQuestion" + number).style.display == "block"){
    document.getElementById("hiddenQuestion" + number).style.display = "none";
  }else{
    document.getElementById("hiddenQuestion" + number).style.display = "block";
  }

}

document.addEventListener('mousedown', function (event) {
  if (event.detail > 1) {
    event.preventDefault();
  }
}, false);
