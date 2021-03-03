const startBtn = document.getElementById("start");
const names = {
  player1: document.getElementById("name1"),
  player2: document.getElementById("name2"),
};
const avatars = {
  player1: document.getElementById("avatar1"),
  player2: document.getElementById("avatar2"),
};
var test = "machin truc";
startBtn.addEventListener("click", function (event) {
  //   window.location = "game.html";
  console.log(names, avatars);
});
