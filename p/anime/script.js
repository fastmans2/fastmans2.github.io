function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setup(){
  game();
}

function draw(){

}
async function game(){
  await anime(test_anime,"test_animation");
  console.log("pog");
}

async function anime(animation,name){
  let img_div = document.createElement("img");
  img_div.classList.add("animation_img");
  document.getElementById("content").appendChild(img_div);
  for(let i=0; i<animation.length; i++){
  img_div.src = "content/"+name+"/"+animation[i].im + ".png";
  await sleep(animation[i].dur);
  console.log("content/"+name+"/"+animation[i].im + ".png");
  }
  document.getElementById("content").removeChild(img_div);
}



var test_anime=[
  {im:"fr1",dur:1000},
  {im:"fr2",dur:1000},
  {im:"fr1",dur:1000},
  {im:"fr2",dur:1000}
]
