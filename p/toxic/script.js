let counter = 0;

function pogman(br){
  document.getElementById('txtn').style.display="none";
  document.getElementById('txtv').style.display="none";
  document.getElementById('img'+counter).style.position="absolute";
  document.getElementById('img'+counter).style.display="block";
  if(br){
    document.getElementById('img'+counter).style.top="1vw";
  }else{
    document.getElementById('img'+counter).style.top="14vw";
  }
  document.getElementById('img'+counter).style.left=(+1 + +(+document.getElementById('sl').value * +0.89)) + "vw";
  counter++;
  if(counter<9){
  document.getElementById('mainimg').src="avs/im"+counter+".png";
  }else{
    document.getElementById('mainimg').style.display="none";
    document.getElementById('bt1').style.display="none";
    document.getElementById('bt2').style.display="none";
  }
}
