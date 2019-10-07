let bpm_p;
let bpm_slider;
let button;
let state;
let bpm;
let spawn_time;
let lenght=20;
let note_amount;
let notes=[];
let timeLines=[];
let scores=[];
let radius=125;
let loadingtime=180;
let current_frame=-210;
let akonekobudetrazioovoonjegej=0;
let ar=45;
let lineOffset=16

var song = new Howl({
  src: ['audio/sponge.mp3']
});

function setup(){
  frameRate(60);
  canvas = createCanvas(1280,720);
  canvas.hide();

  bpm_p = createP("BPM =");
  bpm_p.position(10,10);
  bpm_slider = createSlider(100, 250, 175, 1);
  bpm_slider.position(10,50);
  bpm_slider.style('width', '160px');
  button = createButton('Start');
  button.position(10,100);
  button.mousePressed(finishedSetup);
  state="menu";
}

function draw(){
  if(state=="menu"){
    drawMenu();
  }else if(state=="ingame"){
    drawIngame();
  }else if(state=="done"){
    done();
  }
}

function keyPressed(){
  for(let i of notes){
    i.clicked();
  }
}

function finishedSetup(){
  bpm = bpm_slider.value();
  bpm_p.hide();
  bpm_slider.hide();
  button.hide();
  construct_notes();
  canvas.show();

  state="ingame";

}

function drawMenu(){
  bpm_p.html("BPM = " + bpm_slider.value());
}

function drawIngame(){
  background(0);
  if(current_frame==0){
    song.play();
  }
  textSize(64)
  stroke(255,255,255);
  text(akonekobudetrazioovoonjegej,10,60)
  text(bpm,10,120);
  text(round(map(current_frame,0,note_amount*spawn_time,20,0)),10,180)
  if(round(map(current_frame,0,note_amount*spawn_time,20,0))==-1){
    state="done";
  }
  drawTimerLine();
  for(let i of notes){
    i.show(current_frame);
  }
  for(let i of timeLines){
    i.show();
  }
  for(let i of scores){
    i.show();
  }
  current_frame++;

}
function done(){
  song.stop();
}

function drawTimerLine(){
  stroke(224, 193, 38);
  strokeWeight(4);
  line((width/2)-(ar*3),height-lineOffset,(width/2)-((ar*3)*0.65),height-lineOffset);
  stroke(73, 255, 92);
  line((width/2)-((ar*3)*0.65),height-lineOffset,(width/2)-((ar*3)*0.25),height-lineOffset);
  stroke(91, 154, 255);
  line((width/2)-((ar*3)*0.25),height-lineOffset,(width/2)+((ar*3)*0.25),height-lineOffset);
  stroke(73, 255, 92);
  line((width/2)+((ar*3)*0.25),height-lineOffset,(width/2)+((ar*3)*0.65),height-lineOffset);
  stroke(224, 193, 38);
  line((width/2)+((ar*3)*0.65),height-lineOffset,(width/2)+(ar*3),height-lineOffset);
  stroke(255);
  line(width/2,height-lineOffset+8,width/2,height-lineOffset-8);

}


function construct_notes(){
  spawn_time=round(60*(1/(bpm/60)));
  note_amount=(lenght*60)/spawn_time
  for(i=0;i<note_amount;i++){
    let temp = new Circle(i,radius,i*spawn_time,ar);
    notes.push(temp);
  }
}

function rightButtonPressed(){
  if(keyCode==65 ||keyCode==83 ||keyCode==90 ||keyCode==88 ||mouseButton==LEFT ||mouseButton==RIGHT){
    return true;
  }
}

class Circle{
  constructor(i,r,time,ar){
    this.i=i;
    this.r=r;
    this.x=random(r/2,width-r/2);
    this.y=random(r/2,height-r/2);
    this.time=time;
    this.ar=ar;
    this.deviation;
    this.visible=false;
  }

  show(current_frame){
    if(!this.visible){
      if(current_frame==this.time-this.ar){
        this.visible=true;
      }

    }else{
      fill(255)
      stroke(0)
      ellipse(this.x,this.y,this.r);
      noFill()
      stroke(255);
      strokeWeight(4);
      ellipse(this.x,this.y,map(current_frame,this.time-this.ar,this.time+this.ar,this.r*1.5,this.r*0.5));
      if(current_frame==this.time+this.ar){
        this.visible=false;
      }
    }
  }

  clicked(){
    if(rightButtonPressed() && dist(mouseX,mouseY,this.x,this.y)<=radius/2 && this.visible==true){
      this.visible=false;
      this.deviation=this.time-current_frame;
      if(this.deviation>this.ar*0.65){
        console.log("50");
        akonekobudetrazioovoonjegej+=50;
        let temp2 = new afterScore(this.x,this.y,"50");
        scores.push(temp2);
      }else if(this.deviation>this.ar*0.25){
        console.log("100");
        akonekobudetrazioovoonjegej+=100;
        let temp2 = new afterScore(this.x,this.y,"100");
        scores.push(temp2);
      }else if(this.deviation>this.ar*-0.25){
        console.log("300");
        akonekobudetrazioovoonjegej+=300;
        let temp2 = new afterScore(this.x,this.y,"300");
        scores.push(temp2);
      }else if(this.deviation>this.ar*-0.65){
        console.log("100");
        akonekobudetrazioovoonjegej+=100;
        let temp2 = new afterScore(this.x,this.y,"100");
        scores.push(temp2);
      }else{
        console.log("50");
        akonekobudetrazioovoonjegej+=50;
        let temp2 = new afterScore(this.x,this.y,"50");
        scores.push(temp2);
      }

      let temp2 = new TimeLine(this.deviation);
      timeLines.push(temp2);

    }
  }


}

class TimeLine{
  constructor(deviation){
    this.deviation=deviation;
    this.timer=120
  }

  show(){
    if(this.timer>0){
      stroke(255,255,255,map(this.timer,120,0,255,0));
      line(width/2-(this.deviation)*3,height-16+8,width/2-(this.deviation)*3,height-16-8);
      this.timer--;

    }
  }

}

class afterScore{
  constructor(x,y,score){
    this.x=x;
    this.y=y;
    this.timer=120;
    this.score=score;
  }

  show(){
    if(this.timer>0){
      stroke(255,255,255,map(this.timer,120,0,255,0));
      textSize(32);
      text(this.score,this.x,this.y);
      this.timer--;

    }
  }

}
