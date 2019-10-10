function setup(){
  gameData = loadJSON('http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=730&key=C4BB37F8AB74538279B982A54F2F4147&steamid=76561198231878688')
  .then(data=>{
    console.log(gameData.gameName);
  })

}

function draw(){

}
