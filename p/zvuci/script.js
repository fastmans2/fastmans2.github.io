function player(put){
  let drug = new Audio("avuci/"+put+".mp3");
  drug.play();
}

function trump(){
  put=Math.floor(Math.random() * 8)+1;
  player("ch"+put);
}

function begone(vid){
  vid.style.display="none";
  document.getElementById("suport").style.display="block";
  console.log("hm");
}
