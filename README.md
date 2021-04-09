# Un 421 en javascript

**Un jeu de dés a deux joueur sur le méme écran pour desktop et mobile, l'installation elle se fait uniquement sur un ordinateur.**
**On peu jouer également sur github pages**

## Installation

Vous devez avoir nodejs et npm d'installés et biensur git
versions utilisé:
`$ node -v`
`v14.16.0`
`$ npm -v`
`7.6.0`

- Ouvrir un terminal
- Cloner le depot
- se rendre dans le dossier 421
- `$ npm install`
- `$ npm start`

Ouvrir dans votre navigateur http://localhost:8001 et c'est fait ;)

sinon pour jouer sur github pages voici le lien https://lotiko.github.io/421/public/

## Le jeu

A l'écran d'accueil choisir un nom et un avatar pour les deux joueurs, puis start.
Le jeu commence dont voici les régles:

### Comment jouer au 421

On joue généralement le **421** en deux manches, la **"charge"** et la **"décharge"**.
L’ensemble des jetons est appelé le **"pot"**.

- Lors de la "charge", les joueurs vont se **répartir les 21 jetons**
  entre eux en espérant en récupérer le moins possible.

- la "décharge", les joueurs devront se **débarrasser de tous leurs jetons**.

- Le joueur à gauche démarrera la partie en lançant les trois dés.

#### La Charge

- Les joueurs lance chacun leur tours les trois dés.

- Une fois le lancer du joueur 2 exécuter on compare les combinaisons le perdant prend le nombre de jetons du "pot"
  en fonction de la puissance du coup gagnant (voir tableau à la fin)

- Le joueur qui gagne rejoue

- Cette manche peu être fait de maniére automatique vie le bouton "Charge auto"

#### La Décharge

- Le dernier vianqueur de la charge commence.

- les joueur lance les 3 dés, il peuvent garder de coté un ou deux dés avant de relancer

- Le premier a joué a maximum trois lancés, mais peut garder le coup avant via le boutton "Garder le coup".

- Le second joueur se défend et doit obtenir au minimum autant que la combinaison du premier joueur avec au maximum le
  méme nombre de coups que ce dernier.
- la comparaisons des combinaisons détermine qui perd et récupére
  un nombre de jetons chez l'adversaire en fonction de la force de la combinaisons gagnante (voir tableau à la fin).

#### Pour gagner

- Celui qui n'a plus de jetons dans son camps remporte la partie.

#### La nénette

- la **"nénette"** correspond au coup un dés de 1 et deux dés de 2 c'est le plus petit coups possible et il entraine directement la prise de
  deux jetons du pot ou de l'adversaire.

#### Force et Valeur des combinaisons par ordre décroissant :

| Combinaison                              | Valeur    |
| ---------------------------------------- | --------- |
| 421                                      | 10 jetons |
| 3 As (se dit "Mac 1")                    | 7 jetons  |
| 2 As et Six (se dit "Mac 6")             | 6 jetons  |
| 3 Six (se dit "brelan de 6")             | 6 jetons  |
| 2 As et Cinq (se dit "Mac 5")            | 5 jetons  |
| 3 Cinq (se dit "brelan de 5")            | 5 jetons  |
| 3 As et Quatre (se dit "Mac 4")          | 4 jetons  |
| 3 Quatre (se dit "brelan de 4")          | 4 jetons  |
| 2 As et Trois (se dit "Mac 3")           | 3 jetons  |
| 3 Trois (se dit "brelan de 3")           | 3 jetons  |
| 2 As et Deux (se dit "Mac 2")            | 2 jetons  |
| 3 Deux (se dit "brelan de 2")            | 2 jetons  |
| Quatre, Cinq, Six (se dit suite aux 6)   | 2 jetons  |
| Trois, Quatre, Cinq (se dit suite aux 5) | 2 jetons  |
| Deux, Trois, quatre (se dit suite aux 4) | 2 jetons  |
| As, Deux, Trois (se dit suite aux 3)     | 2 jetons  |
| As, Deux, Deux (se dit nénette)          | -2 jetons |
