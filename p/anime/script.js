function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setup(){
  game();
}

function draw(){

}
async function game(){
  let normal_wike = new Wike("wike1",100,100)
}

async function anime(animation,name){
  let img_div = document.createElement("img");
  img_div.classList.add("animation_img");
  document.getElementById("content").appendChild(img_div);
  for(let i=0; i<animation.length; i++){
  img_div.src = "content/"+name+"/"+animation[i].im + ".png";
  await sleep(animation[i].dur);
  }
  document.getElementById("content").removeChild(img_div);
}

class Wike{
  constructor(pic,x,y){
    let wike_div = document.createElement("div");
    let wike_img = document.createElement("img");
    wike_img.src = "content/wikes/"+pic+".png";
    document.getElementById("content").appendChild(wike_div);
    wike_div.appendChild(wike_img);
    wike_img.style.position="relative";
    wike_img.style.top = y+"px";
    wike_img.style.left = x+"px";
  }
}

var test_anime=[
  {im:"fr1",dur:1000},
  {im:"fr2",dur:1000},
  {im:"fr1",dur:1000},
  {im:"fr2",dur:1000}
]
