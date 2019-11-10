var tile_size;
var tiles_x,tiles_y;
var tiles;
var started=false;
var bombs;
var frozen=true;
var ended=false;
var remaining;
var bomb_slider_edited=false;

function start_custom_game(){
  let custom_x = document.getElementById("slider_x").value;
  let custom_y = document.getElementById("slider_y").value;
  let custom_bombs = document.getElementById("slider_bomb").value;
  let custom_size=map(custom_x,5,30,128,32);
  start_game(custom_x,custom_y,custom_bombs,custom_size);

}

function start_game(til_x,til_y,bom,tile_siz){
  frozen=false;
  tile_size = tile_siz;
  tiles_x = til_x;
  tiles_y = til_y;
  bombs=bom;
  remaining=(tiles_x*tiles_y)-bombs;
  document.getElementById("start_menu").style.display="none";
  var canvas = createCanvas(tiles_x*tile_size,tiles_y*tile_size);
  canvas.id('main-canvas');
  document.getElementById("main-canvas").addEventListener("contextmenu", function(e){
    if(ended)return;
      e.preventDefault();
      rightClicked();
  }, false);
  document.getElementById("main-canvas").addEventListener('mouseup', function(e) {
    if(ended)return;
    e.preventDefault();
    switch(e.which){
      case 1:leftClicked();break;
      case 2:middleClicked();break;
      case 3:break;
      default:console.log("something gone horribly wrong");
    }
  }, false);
  tiles = new Array(tiles_x);
  noStroke();
  for(var i=0; i<tiles_x; i++){
    var temp = new Array(tiles_y);
    for(var j=0; j<tiles_y; j++){
      temp[j]=new Tile(i,j);
      temp[j].draw("hidden");
    }
    tiles[i]=temp;
  }

}

function showSliders(){
  document.getElementById("diff_buttons").style.display="none";
  document.getElementById("slider_container").style.display="block";
  document.getElementById("slider_x").addEventListener("input",function(){
    document.getElementById("slider_bomb").max=document.getElementById("slider_x").value*document.getElementById("slider_y").value-9;
    document.getElementById("slider_x_text").innerHTML=document.getElementById("slider_x").value;
    document.getElementById("slider_bomb_text").innerHTML=document.getElementById("slider_bomb").value;
  })
  document.getElementById("slider_y").addEventListener("input",function(){
    document.getElementById("slider_bomb").max=document.getElementById("slider_x").value*document.getElementById("slider_y").value-9;
    document.getElementById("slider_y_text").innerHTML=document.getElementById("slider_y").value;
    document.getElementById("slider_bomb_text").innerHTML=document.getElementById("slider_bomb").value;
  })
  document.getElementById("slider_bomb").addEventListener("input",function(){
    if(!bomb_slider_edited)bomb_slider_edited=true;
    document.getElementById("slider_bomb_text").innerHTML=document.getElementById("slider_bomb").value;
  })
}

class Tile{
  constructor(i,j){
    this.i=i;
    this.j=j;
    this.x=i*tile_size;
    this.y=j*tile_size;
    this.shown=false;
    this.isBomb=false;
    this.hasFlag=false;
  }

  draw(st){
    var mr=(round(tile_size/20));
    switch (st) {
      case "hidden": fill(89,164,255);break;
      case "shown": fill(240);break;
      case "bomb": fill(0);break;
      case "flag": fill(49,104,235);break;
      case "right": fill(167,213,75);break;
      case "wrong": fill(240,128,128);break;
      default:console.log("bad");
    }
    rect(this.x+mr,this.y+mr,tile_size-mr*2,tile_size-mr*2,7);
  }
  addNumber(num){
    textAlign(CENTER);
    textFont('Roboto');
    textSize(tile_size*0.8);
    text(num, this.x+(tile_size/2), this.y+(tile_size*0.8));
  }
  neighbours(){
    let count=0;
    if(this.i-1>=0 && tiles[this.i-1][this.j].isBomb)count++;
    if(this.j-1>=0 && tiles[this.i][this.j-1].isBomb)count++;
    if(this.i+1<tiles_x && tiles[this.i+1][this.j].isBomb)count++;
    if(this.j+1<tiles_y && tiles[this.i][this.j+1].isBomb)count++;
    if(this.i-1>=0 && this.j-1>=0 && tiles[this.i-1][this.j-1].isBomb)count++;
    if(this.j-1>=0 && this.i+1<tiles_x && tiles[this.i+1][this.j-1].isBomb)count++;
    if(this.i+1<tiles_x && this.j+1<tiles_y && tiles[this.i+1][this.j+1].isBomb)count++;
    if(this.j+1<tiles_y && this.i-1>=0 && tiles[this.i-1][this.j+1].isBomb)count++;
    return count;
  }
  flagNeighbours(){
    let count=0;
    if(this.i-1>=0 && tiles[this.i-1][this.j].hasFlag)count++;
    if(this.j-1>=0 && tiles[this.i][this.j-1].hasFlag)count++;
    if(this.i+1<tiles_x && tiles[this.i+1][this.j].hasFlag)count++;
    if(this.j+1<tiles_y && tiles[this.i][this.j+1].hasFlag)count++;
    if(this.i-1>=0 && this.j-1>=0 && tiles[this.i-1][this.j-1].hasFlag)count++;
    if(this.j-1>=0 && this.i+1<tiles_x && tiles[this.i+1][this.j-1].hasFlag)count++;
    if(this.i+1<tiles_x && this.j+1<tiles_y && tiles[this.i+1][this.j+1].hasFlag)count++;
    if(this.j+1<tiles_y && this.i-1>=0 && tiles[this.i-1][this.j+1].hasFlag)count++;
    return count;
  }
  called(){
    if(this.shown || this.hasFlag)return;
    if(this.isBomb){
      endGame();
      return;
    }
      this.shown=true;
      if(this.neighbours()==0){
        this.draw("shown");
        if(this.i-1>=0 && !tiles[this.i-1][this.j].shown)tiles[this.i-1][this.j].called();
        if(this.j-1>=0 && !tiles[this.i][this.j-1].shown)tiles[this.i][this.j-1].called();
        if(this.i+1<tiles_x && !tiles[this.i+1][this.j].shown)tiles[this.i+1][this.j].called();
        if(this.j+1<tiles_y && !tiles[this.i][this.j+1].shown)tiles[this.i][this.j+1].called();
        if(this.i-1>=0 && this.j-1>=0 && !tiles[this.i-1][this.j-1].shown)tiles[this.i-1][this.j-1].called();
        if(this.j-1>=0 && this.i+1<tiles_x && !tiles[this.i+1][this.j-1].shown)tiles[this.i+1][this.j-1].called();
        if(this.i+1<tiles_x && this.j+1<tiles_y && !tiles[this.i+1][this.j+1].shown)tiles[this.i+1][this.j+1].called();
        if(this.j+1<tiles_y && this.i-1>=0 && !tiles[this.i-1][this.j+1].shown)tiles[this.i-1][this.j+1].called();
      }else{
        this.draw("shown");
        switch(this.neighbours()){
          case 1: fill(25,189,224);break;
          case 2: fill(112,148,25);break;
          case 3: fill(223,40,112);break;
          case 4: fill(26,85,193);break;
          case 5: fill(183,27,27);break;
          case 6: fill(62,154,81);break;
          case 7: fill(120,62,113);break;
          case 8: fill(15);break;
        }
        this.addNumber(this.neighbours());
      }
      remaining--;
      if(remaining==0)wonGame();
  }
  flag(){
    if(this.shown)return;
    if(!this.hasFlag){
      this.draw("flag");
    }else{
      this.draw("hidden");
    }
    this.hasFlag=!this.hasFlag;
  }
  quick(){
    if(!this.shown || this.neighbours()==0)return;
    if(this.neighbours()==this.flagNeighbours()){
      if(this.i-1>=0)tiles[this.i-1][this.j].called();
      if(this.j-1>=0)tiles[this.i][this.j-1].called();
      if(this.i+1<tiles_x)tiles[this.i+1][this.j].called();
      if(this.j+1<tiles_y)tiles[this.i][this.j+1].called();
      if(this.i-1>=0 && this.j-1>=0)tiles[this.i-1][this.j-1].called();
      if(this.j-1>=0 && this.i+1<tiles_x)tiles[this.i+1][this.j-1].called();
      if(this.i+1<tiles_x && this.j+1<tiles_y)tiles[this.i+1][this.j+1].called();
      if(this.j+1<tiles_y && this.i-1>=0)tiles[this.i-1][this.j+1].called();
    }
  }
}
function rightClicked(){
  if(!started || frozen)return;
  cell_clicked_x=floor(mouseX/tile_size);
  cell_clicked_y=floor(mouseY/tile_size);
  tiles[cell_clicked_x][cell_clicked_y].flag()
}

function middleClicked(){
  if(!started || frozen)return;
  cell_clicked_x=floor(mouseX/tile_size);
  cell_clicked_y=floor(mouseY/tile_size);
  tiles[cell_clicked_x][cell_clicked_y].quick();
}

function leftClicked(){
  cell_clicked_x=floor(mouseX/tile_size);
  cell_clicked_y=floor(mouseY/tile_size);
  if(started){tiles[cell_clicked_x][cell_clicked_y].called();return;}
  else{setBombs(cell_clicked_x,cell_clicked_y)}
}

function setBombs(start_tile_x,start_tile_y){
  if(started)return;
  started=true;
  while(bombs>0){
    let bomb_x = floor(random(0,tiles_x));
    let bomb_y = floor(random(0,tiles_y));
    if(bomb_x>=start_tile_x-1 && bomb_x<=start_tile_x+1)
      if(bomb_y>=start_tile_y-1 && bomb_y<=start_tile_y+1)continue;
    if(tiles[bomb_x][bomb_y].isBomb==false){
      tiles[bomb_x][bomb_y].isBomb=true;
      //tiles[bomb_x][bomb_y].draw("bomb");
      bombs--;
    }
  }
  tiles[start_tile_x][start_tile_y].called();
}

function endGame(){
  ended=true;
  for(let i in tiles){
    for(let j in tiles[i]){
      if(tiles[i][j].isBomb && !tiles[i][j].hasFlag){
        tiles[i][j].draw("bomb");
      }else if(tiles[i][j].isBomb && tiles[i][j].hasFlag){
        tiles[i][j].draw("right");
      }else if(!tiles[i][j].isBomb && tiles[i][j].hasFlag){
        tiles[i][j].draw("wrong");
      }
    }
  }
  let end_text=document.createElement("h1");
  end_text.innerHTML="Nice try";
  end_text.classList.add("end_screen");
  document.getElementById("bod").appendChild(end_text);
}
function wonGame(){
  ended=true;
  for(let i in tiles){
    for(let j in tiles[i]){
      if(tiles[i][j].isBomb){
        tiles[i][j].draw("right");
      }
    }
  }
  let end_text=document.createElement("h1");
  end_text.innerHTML="You win!";
  end_text.classList.add("end_screen");
  document.getElementById("bod").appendChild(end_text);
}

function setup(){}
