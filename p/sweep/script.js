let line_offset=2;
let board_width=10;
let board_height=10;
let tile_state = new Array(board_height);
for(let i=0;i<board_height;i++){
  let tile_state_x = new Array(board_width);
  for(let j=0;j<board_width;j++) {
    tile_state_x[j]=0;
  }
  tile_state[i] = tile_state_x;
}
let bombs_num=20;
let bombs=0



function setup(){
  var canvas = createCanvas(640,640);
  canvas.addClass("main");
  background(0);
  noStroke();
  fill(25);
  for(let i in tile_state){
    for(let j in tile_state[i]){
      rect((j*(width/board_width))+line_offset,(i*(height/board_height))+line_offset,((width/board_width))-(2*line_offset),((height/board_height))-(line_offset*2));
    }
  }
  fill(255);
  while(bombs<bombs_num){
    let bomb_x = floor(random(0,board_width));
    let bomb_y = floor(random(0,board_height));
    if(tile_state[bomb_x][bomb_y]==0){
      tile_state[bomb_x][bomb_y]=1;
      bombs++;
      fill(200,0,0);
      rect((bomb_y*(width/board_width))+line_offset,(bomb_x*(height/board_height))+line_offset,((width/board_width))-(2*line_offset),((height/board_height))-(line_offset*2));
      fill(255);
    }

  }
  console.log(tile_state);
}

function draw(){


}

function mouseClicked(){
  cell_clicked_x=floor(mouseX/(width/board_width));
  cell_clicked_y=floor(mouseY/(height/board_height));
  if(cell_clicked_x<0 || cell_clicked_x>=board_width || cell_clicked_y<0 || cell_clicked_y>=board_height) return;
  //console.log(cell_clicked_x,cell_clicked_y);
  //reveal(cell_clicked_x,cell_clicked_y);
  console.log(checkNeighbours(cell_clicked_x,cell_clicked_y));
  test()
}

function reveal(x,y){
  fill(240);
  rect((x*(width/board_width))+line_offset,(y*(height/board_height))+line_offset,((width/board_width))-(2*line_offset),((height/board_height))-(line_offset*2));
  fill(255);
}

function checkNeighbours(x,y){
  if(tile_state[y][x]==1) return 0;
  let found=0;
  if(x-1>=0){
    if(tile_state[y][x-1]==1){
      found++;
    }
  }
  if(x+1<board_width){
    if(tile_state[y][x+1]==1){
      found++;
    }
  }
  if(y-1>=0){
    if(tile_state[y-1][x]==1){
      found++;
    }
  }
  if(y+1<board_height){
    if(tile_state[y+1][x]==1){
      found++;
    }
  }
  if(x-1>=0 && y-1>=0){
    if(tile_state[y-1][x-1]==1){
      found++;
    }
  }
  if(x+1<board_width && y-1>=0){
    if(tile_state[y-1][x+1]==1){
      found++;
    }
  }
  if(x-1>=0 && y+1<board_height){
    if(tile_state[y+1][x-1]==1){
      found++;
    }
  }
  if(x+1<board_width && y+1<board_height){
    if(tile_state[y+1][x+1]==1){
      found++;
    }
  }
  return found;
}

function test(){
  textSize(30);
  textAlign(CENTER);
  text("1",0*(width/board_width)+(width/board_width)/2,0*(height/board_height)+(height/board_height)/2);
}
