let pad_width = 40;

let left;
let left_x = 1000;
let left_y = 325;
let left_height=200;
let left_up_control=38;
let left_down_control=40;

let right;
let right_x = 70;
let right_y = 325;
let right_height=200;
let right_up_control=87;
let right_down_control=83;

let ball;
let ball_x=535;
let ball_y=410;
let ball_size=30;
let ball_size_buff=0;
let ball_path_y;
let ball_path_x;

let faze=1;
let winner;
let speed=10;
let speed_buff=0.25;

function setup(){

  //Canvas
  canv = createCanvas(1100,850);
  canv.style("float","left");
  //Options
  acceleration_slider = createSlider(-10,20,speed_buff,0.25);
  acceleration_slider.style("width","256px");
  acceleration_text = createSpan();
  acceleration_text.style("font-size","32px");
  acceleration_text.style("margin","0 16px");
  acceleration_box = createInput(speed_buff);
  acceleration_box_oldvalue = acceleration_slider.value();
  acceleration_box.style("font-size","28px");
  acceleration_box.style("width","80px");
  acceleration_desc = createSpan("Ball Acceleration");
  acceleration_desc.style("font-size","32px");
  acceleration_desc.style("margin","0 16px");
  createSpan("<br><br>");
  ball_size_slider = createSlider(2,200,ball_size,1);
  ball_size_slider.style("width","256px");
  ball_size_text = createSpan();
  ball_size_text.style("font-size","32px");
  ball_size_text.style("margin","0 16px");
  ball_size_box = createInput(ball_size);
  ball_size_box_oldvalue = ball_size_slider.value();
  ball_size_box.style("font-size","28px");
  ball_size_box.style("width","80px");
  ball_size_desc = createSpan("Ball Size");
  ball_size_desc.style("font-size","32px");
  ball_size_desc.style("margin","0 16px");
  createSpan("<br><br>");
  ball_size_buff_slider = createSlider(-20,20,ball_size_buff,1);
  ball_size_buff_slider.style("width","256px");
  ball_size_buff_text = createSpan();
  ball_size_buff_text.style("font-size","32px");
  ball_size_buff_text.style("margin","0 16px");
  ball_size_buff_box = createInput("0");
  ball_size_buff_box_oldvalue = ball_size_buff_slider.value();
  ball_size_buff_box.style("font-size","28px");
  ball_size_buff_box.style("width","80px");
  ball_size_buff_desc = createSpan("Ball Size Incrementation");
  ball_size_buff_desc.style("font-size","32px");
  ball_size_buff_desc.style("margin","0 16px");
  createSpan("<br><br>");
  singleplayer_checkbox = createCheckbox('Singleplayer', false);
  singleplayer_checkbox.style("font-size","16px");
  singleplayer_checkbox.style("zoom","2");
  singleplayer_drunk_checkbox = createCheckbox('Drunk Singleplayer', false).hide();
  singleplayer_drunk_checkbox.style("font-size","16px");
  singleplayer_drunk_checkbox.style("zoom","2");

  //Other Settings
  ball_path_y = 0;
  ball_path_x = random([-1,1]);
  frameRate(60);
  textSize(32);
  fill(255);
  noStroke();
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
      hideStuff();
      ball_size_default = ball_size;
      faze=2;
      if(singleplayer_checkbox.checked()){
        if(singleplayer_drunk_checkbox.checked()){
          right_up_control=left_down_control;
          right_down_control=left_up_control;
        }else{
          right_up_control=left_up_control;
          right_down_control=left_down_control;
        }

      }
    }

    updateStuff();
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
  if(keyIsDown(left_down_control) && left_y+left_height<850){
    left_y+=10;
  }

  if(keyIsDown(left_up_control) && left_y>0){
    left_y-=10;
  }
  if(keyIsDown(right_down_control) && right_y+right_height<850){
    right_y+=10;
  }

  if(keyIsDown(right_up_control) && right_y>0){
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


  //Hit left & right
   if(ball_path_x==1 && ball_x>=left_x-ball_size){
     if(ball_y+ball_size>left_y && ball_y<left_y+left_height && ball_x<left_x+pad_width/2){
       ball_path_x=-1;
       ball_path_y = floor(random(-10,11));
       speed += speed_buff;
       if(ball_size+ball_size_buff>=2 && ball_size+ball_size_buff<=height/2) ball_size+=ball_size_buff;
       console.log(speed);
     }
   }
   if(ball_path_x==-1 && ball_x<=right_x+pad_width){
     if(ball_y+ball_size>right_y && ball_y<right_y+right_height && ball_x>right_x+pad_width/2){
      ball_path_x=1;
      ball_path_y = floor(random(-10,11));
      speed += speed_buff;
      if(ball_size+ball_size_buff>=2 && ball_size+ball_size_buff<=height/2) ball_size+=ball_size_buff;
      console.log(speed);
     }
    }
  //Hit top & bottom
  if(ball_path_y>=0 && ball_y>=850-ball_size){
    ball_path_y*=-1;
  }

  if(ball_path_y<0 && ball_y<=0 ){
    ball_path_y*=-1;
  }
 //Restart
 if(ball_x+ball_size<0){
   left_y+=10;
   if(left_height-20>0){
     left_height-=20;
     ball_path_x=1;
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
     ball_path_x=-1;
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
  ball_path_y = 0;
  speed = 10;
  ball_size = ball_size_default;
}

function updateStuff(){
  if(acceleration_box.value()!=acceleration_box_oldvalue){
    acceleration_slider.value(acceleration_box.value());
    acceleration_box_oldvalue = acceleration_box.value();
  }
  acceleration_text.html(Number(acceleration_slider.value()).toFixed(2));
  speed_buff = acceleration_slider.value();

  if(ball_size_box.value()!=ball_size_box_oldvalue){
    ball_size_slider.value(ball_size_box.value());
    ball_size_box_oldvalue = ball_size_box.value();
  }
  ball_size_text.html(Number(ball_size_slider.value()));
  ball_size=ball_size_slider.value();

  if(ball_size_buff_box.value()!=ball_size_buff_box_oldvalue){
    ball_size_buff_slider.value(ball_size_buff_box.value());
    ball_size_buff_box_oldvalue = ball_size_buff_box.value();
  }
  ball_size_buff_text.html(Number(ball_size_buff_slider.value()));
  ball_size_buff=ball_size_buff_slider.value();

  ball_x=width/2-ball_size/2;
  ball_y=height/2-ball_size/2;

  if(singleplayer_checkbox.checked()){
    singleplayer_drunk_checkbox.show();
  }else{
    singleplayer_drunk_checkbox.hide();
    singleplayer_drunk_checkbox.checked(false);
  }
}

function hideStuff(){
  acceleration_slider.hide();
  acceleration_box.hide();
  ball_size_slider.hide();
  ball_size_box.hide();
  ball_size_buff_slider.hide();
  ball_size_buff_box.hide();
}
