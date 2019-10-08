let pad_width = 40;

let left;
let left_x = 1000;
let left_y = 325;
let left_height=200;

let right;
let right_x = 70;
let right_y = 325;
let right_height=200;

let ball;
let ball_x=535;
let ball_y=410;
let ball_size=30;
let ball_path_y;
let ball_path_x;

let faze=1;
let winner;
let speed=10;
let speed_buff=0.25;

function setup(){


  canv = createCanvas(1100,850);

  ball_path_y = floor(random(-10,11));
  ball_path_x = random([-1,1]);
  frameRate(60);
  textSize(32);
  fill(255);

}

function draw(){
  background(0);
  if(faze==1){
    text('Press Enter to start', 410, 300);
    text('w', 80, 300);
    text('s', 80, 570);
    text('Up', 1000, 300);
    text('Down', 980, 570);
    left = rect(left_x,left_y,pad_width,left_height);
    right = rect(right_x,right_y,pad_width,right_height);
    ball = rect(ball_x,ball_y,ball_size,ball_size);
    if(keyIsDown(13)){
      faze=2;
    }
  }

  if(faze==2){
  Calc_ball();


  left = rect(left_x,left_y,pad_width,left_height);
  right = rect(right_x,right_y,pad_width,right_height);
  ball = rect(ball_x,ball_y,ball_size,ball_size);
  Input();
  }

  if(faze==3){
    text(winner+' Wins', 410, 300);
  }

  if(faze==4){
    left = rect(left_x,left_y,pad_width,left_height);
    right = rect(right_x,right_y,pad_width,right_height);
    ball = rect(ball_x,ball_y,ball_size,ball_size);
    text('Press Numpad0 to continue', 410, 300);
    if(keyIsDown(45) || keyIsDown(96)){
      faze = 2;
    }
  }
}

function Input(){
  if(keyIsDown(DOWN_ARROW) && left_y+left_height<850){
    left_y+=10;
  }

  if(keyIsDown(UP_ARROW) && left_y>0){
    left_y-=10;
  }
  if(keyIsDown(83) && right_y+right_height<850){
    right_y+=10;
  }

  if(keyIsDown(87) && right_y>0){
    right_y-=10;
  }

  if(keyIsDown(27)){
    faze = 4;
    console.log("?");
  }
}

function Calc_ball(){
 ball_x+=(round(speed)*ball_path_x);
 ball_y+=ball_path_y;


   if(ball_path_x==1 && ball_x>=left_x-ball_size){
     if(ball_y+30>left_y && ball_y<left_y+left_height && ball_x<left_x+pad_width/2){
       ball_path_x=-1;
       ball_path_y = floor(random(-10,11));
       speed += speed_buff;
       console.log(speed);
     }
   }
   if(ball_path_x==-1 && ball_x<=right_x+pad_width){
     if(ball_y+30>right_y && ball_y<right_y+right_height && ball_x>right_x+pad_width/2){
      ball_path_x=1;
      ball_path_y = floor(random(-10,11));
      speed += speed_buff;
      console.log(speed);
     }
    }

  if(ball_path_y>=0 && ball_y>=850-ball_size){
    ball_path_y*=-1;
  }

  if(ball_path_y<0 && ball_y<=0 ){
    ball_path_y*=-1;
  }

 if(ball_x+ball_size<0){
   left_y+=10;
   if(left_height-20>0){
     left_height-=20;
     ResetStuff();
   }else{
     winner='Right';
     faze=3;
   }

 }

 if(ball_x>1100){
   right_y+=10;
   if(right_height-20>0){
     right_height-=20;
     ResetStuff();
   }else{
     winner='Left';
     faze=3;
   }

 }

}

function ResetStuff(){
  ball_x=535;
  ball_y=410;
  ball_path_y = floor(random(-10,11));
  ball_path_x = random([-1,1]);
  speed = 10;
}
