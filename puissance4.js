// variable 
let nbColumns = document.querySelector("#nbColumn");
let  nbLignes = document.querySelector("#nbLigne");
let  valide = document.querySelector("#valide");
let etatJeu = {
  cellules: [],

  // Deux joueurs possibles : "BLEU" ou "ORANGE"
  joueur: "ROUGE",
};

// // Selection les élements du tableau

const iconx = "🔴";
const icono = "🟡";
const cellules = document.querySelectorAll(".cellule");
const message = document.querySelector("#instruction");

function jouer(event) {
  const id = event.target.getAttribute("id");
  const morceaux = id.split("-");
  const ligne = parseInt(morceaux[1]);
  const colonne = parseInt(morceaux[2]);
  const cellule = etatJeu.cellules[ligne][colonne];
  if (cellule === null) {
    // On met à jour l'état du jeu
    etatJeu.cellules[ligne][colonne] = etatJeu.joueur;
    // On met à jour l'affichage
    event.target.textContent = etatJeu.joueur === "JAUNE" ? icono : iconx;
    // On vérifie si le joueur a gagné
    const gagnant = win(ligne,colonne,10,10,ligne,colonne);
    if (gagnant !== null) {
      // On affiche le message de victoire
      message.textContent = `Le joueur ${gagnant} a gagné!`;
      // On désactive les cellules
      cellules.forEach((cellule) => {
        cellule.removeEventListener("click", jouer);
        cellule.classList.add("disabled");
      });
    } else {
    //   // On change de joueur
      etatJeu.joueur = etatJeu.joueur === "ROUGE" ? "JAUNE" : "ROUGE";
      // On affiche le message
      message.textContent = `Au tour du joueur ${etatJeu.joueur}`;
    }
  }
}



// grille addeptative

function grille(nbLigne, nbColumn) {
  let board = new Array(nbLigne);            
  for (let i = 0; i < nbLigne; i++) { 
    board[i]= new Array(nbColumn);
    for (let j = 0; j < nbColumn; j++) {
      board[i][j] = null
    } }
    for (let i = 0; i< nbLigne; i++){
      let tr = document.createElement("tr")
    for (let j = 0; j < nbColumn; j++){
      ;
      let td = document.createElement("td");
      td.setAttribute("id", `cell-${i}-${j}`);
      td.classList.add('case')
     
      tr.appendChild(td)
    }
 document.querySelector(".table").appendChild(tr)}
    
  
  return (board)
 }

// win 

function win(i,j, y, a,b,c){
//Horizontal
for ( i = i; i < y; i++) {
  for(  j = j; j < a; j++ ) {
  if (
    etatJeu.cellules[i][j] === etatJeu.joueur &&
    etatJeu.cellules[i][(j + 1)] === etatJeu.joueur &&
    etatJeu.cellules[i][(j + 2)] === etatJeu.joueur &&
    etatJeu.cellules[i][(j + 3)] === etatJeu.joueur
    ||
    etatJeu.cellules[i][j] === etatJeu.joueur &&
    etatJeu.cellules[i][(j - 1)] === etatJeu.joueur &&
    etatJeu.cellules[i][(j - 2)] === etatJeu.joueur &&
    etatJeu.cellules[i][(j - 3)] === etatJeu.joueur
  ) {
    return etatJeu.joueur;
  }
}
}

//  vertical
// for ( b = b; b < y; b++) {
//   for(  c= c; c< a; c++ ) {
//     console.log("test2");
//   if (
//     etatJeu.cellules[c][b] === etatJeu.joueur &&
//     etatJeu.cellules[c][(b + 1)] === etatJeu.joueur &&
//     etatJeu.cellules[c][(b + 2)] === etatJeu.joueur &&
//     etatJeu.cellules[c][(b + 3)] === etatJeu.joueur
//     ||
//     etatJeu.cellules[c][b] === etatJeu.joueur &&
//     etatJeu.cellules[c][(b - 1)] === etatJeu.joueur &&
//     etatJeu.cellules[c][(b - 2)] === etatJeu.joueur &&
//     etatJeu.cellules[c][(b - 3)] === etatJeu.joueur
//   ) {
//     return etatJeu.joueur;
//   }
//   }
// }
// Vérifie les diagonales
// Diagonale 1
if (
  etatJeu.cellules[0][0] === etatJeu.joueur &&
  etatJeu.cellules[1][1] === etatJeu.joueur &&
  etatJeu.cellules[2][2] === etatJeu.joueur
) {
  return etatJeu.joueur;
}

// Diagonale 2
if (
  etatJeu.cellules[0][2] === etatJeu.joueur &&
  etatJeu.cellules[1][1] === etatJeu.joueur &&
  etatJeu.cellules[2][0] === etatJeu.joueur
) {
  return etatJeu.joueur;
}
return null;
}


valide.addEventListener("click", function () {
  etatJeu.cellules = grille(Number(nbLignes.value), Number(nbColumns.value))
  nbColumns.hidden= true  
  nbLignes.hidden= true  
  valide.hidden= true 
const cellules = document.querySelectorAll(".case");
for (const cellule of cellules) {
  cellule.addEventListener("click", jouer);

}

});

