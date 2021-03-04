import { Player } from "../player.js";

const text = document.getElementById("text");
console.log(text);
const playerText = document.getElementById("player-text");
const validButton = document.getElementById("start");
const startBtn = document.getElementById("start");
const name = document.getElementById("name");
const avatar_player = document.getElementById("avatar-player");
const avatars = document.getElementsByClassName("avatar-item");
const players = { player1: new Player(1), player2: new Player(2) };
let i = 0;

///////////// function
function checkValidePlayer(name, avatar, nbPlayer) {
  if (name === "" || name.length > 8) {
    alert("Le nom du joueur doit contenir entre 1 et 8 lettres");
    return;
  }
  if (avatar.firstChild.id === "empty") {
    alert("Veuilez choisir un avatar en cliquant sur un des differants choix");
    return;
  }
  players[`player${nbPlayer}`].setPlayer(name, avatar.firstChild.getAttribute("src"));
}
function changeViewSetPlayer() {
  let sliceOldText = text.firstChild.textContent.trim().slice(0, -1);
  console.log(text);
  text.textContent = sliceOldText + "2";
  sliceOldText = playerText.firstChild.textContent.slice(0, -1);
  playerText.firstChild.textContent = sliceOldText + "2";
  validButton.textContent = "start";
}
function insertInAvatarPlayer(ev) {
  let avatar = ev.srcElement.cloneNode();
  avatar_player.removeChild(avatar_player.firstChild);
  avatar_player.append(avatar);
}

///////////////////// events
i = 0;
while (i < 8) {
  avatars[i].addEventListener("click", insertInAvatarPlayer);
  i++;
}
startBtn.addEventListener("click", function (event) {
  if (startBtn.textContent === "Valider joueur 1") {
    checkValidePlayer(name.value, avatar_player, 1);
    changeViewSetPlayer();
  }
  // console.log(startBtn.textContent, name, avatar_player, player1, player2);
});
