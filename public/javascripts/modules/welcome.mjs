/**
 *
 * @author: lotiko
 * @date:  03/2021
 *
 * @summary: all process for the welcome page to set player
 */

//////// CONST  and LET for process
const text = document.getElementById("text");
const validButton = document.getElementById("start");
const startBtn = document.getElementById("start");
const namePlayer = document.getElementById("name");
const avatar_player = document.getElementById("avatar-player");
const avatars = document.getElementsByClassName("avatar-item");
const storage = window.sessionStorage;
let i = 0;

///////////// FUNCTION
/**
 *  check if values to set player is correct then store in sessionstorage
 * @param {string} name
 * @param {string} avatar
 * @param {number} nbPlayer
 */
function checkValidePlayer(name, avatar, nbPlayer) {
  if (name === "" || name.length > 8) {
    alert("Le nom du joueur doit contenir entre 1 et 8 lettres");
    return false;
  }
  if (avatar.children.length === 0) {
    alert("Veuilez choisir un avatar en cliquant sur un des differants choix");
    return false;
  }
  let player = { name: name, avatarPath: avatar.firstChild.getAttribute("src") };
  storage.setItem(`player${nbPlayer}Info`, JSON.stringify(player));
  return true;
}

/**
 * insert in the player box the avatar that the user has clicked on
 * @param {object} ev
 */
function insertInAvatarPlayer(ev) {
  let avatar = ev.srcElement.cloneNode();
  if (avatar_player.children.length > 0) {
    avatar_player.removeChild(avatar_player.firstChild);
  }
  avatar_player.append(avatar);
}

///////////////////// EVENTS

// Add  inserInAvatarPlayer() by click event on all avatar-item
i = 0;
while (i < 8) {
  avatars[i].addEventListener("click", insertInAvatarPlayer);
  i++;
}

// #start on click check currentPlayer value and launch good process
startBtn.addEventListener("click", function (event) {
  if (startBtn.textContent === "Valider") {
    if (checkValidePlayer(namePlayer.value, avatar_player, 1)) {
      validButton.textContent = "start";
      avatar_player.removeChild(avatar_player.firstChild);
      namePlayer.value = "";
    }
  } else {
    if (checkValidePlayer(namePlayer.value, avatar_player, 2)) {
      window.location = "game.html";
    }
  }
});
