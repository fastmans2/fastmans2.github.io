let counter = 0;
let offset=true;

function pogman(){
  document.getElementById('img'+counter).style.position="absolute";
  document.getElementById('img'+counter).style.display="block";
  if(offset){
    document.getElementById('img'+counter).style.top="1vw";
  }else{
    document.getElementById('img'+counter).style.top="14vw";
  }
  offset=!offset;
  document.getElementById('img'+counter).style.left=(+1 + +(+document.getElementById('sl').value * +0.89)) + "vw";
  counter++;
  if(counter<9){
  document.getElementById('mainimg').src="avs/im"+counter+".png";
  }else{
    document.getElementById('mainimg').style.display="none";
    document.getElementById('bt').style.display="none";
  }
}
