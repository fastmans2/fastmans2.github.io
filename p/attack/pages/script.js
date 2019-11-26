let quests;

function setup(){
  createCanvas(1280,720);
  background(50,203,237);
  Quest.list = [];
  let Quest1 = new Quest(width*0.2,height*0.5,70,[],"Yeah",20,"shown");
  let Quest2 = new Quest(width*0.4,height*0.5,70,[Quest1],"This",20);
  let Quest3 = new Quest(width*0.6,height*0.25,70,[Quest2],"Is",20);
  let Quest4 = new Quest(width*0.6,height*0.75,70,[Quest2],"Brain",20);
  let Quest5 = new Quest(width*0.8,height*0.5,70,[Quest3,Quest4],"Time",20);
}


function mouseClicked() {
  for(let i in Quest.list){
    stroke(255);
    strokeWeight(15);
    if(mouseX>Quest.list[i].x-Quest.list[i].size*0.85 && mouseY>Quest.list[i].y-Quest.list[i].size*0.85 && mouseX<Quest.list[i].x+Quest.list[i].size*0.85 && mouseY<Quest.list[i].y+Quest.list[i].size*0.85){
      Quest.list[i].onclick();
    }
  }
}





class Quest{
  constructor(x,y,size,parents,txt,textsize){
    this.x=x;
    this.y=y;
    this.size=size;
    this.txt=txt;
    this.textsize=textsize;
    this.parents=parents;
    this.draw();
    Quest.list.push(this);
  }

  draw(){
    for(let i in this.parents){
      strokeWeight(8);
      stroke(0);
      line(this.x,this.y,this.parents[i].x,this.parents[i].y);
      this.parents[i].draw();
    }
    strokeWeight(1);
    stroke(0);
    fill(28,82,94);
    polygon(this.x,this.y,this.size,6);
    textAlign(CENTER, CENTER);
    textSize(this.textsize);
    fill(89,110,116);
    noStroke();
    text(this.txt,this.x,this.y);
  }

  onclick(){
    console.log(this.txt);
  }
}


//stolen code
function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
