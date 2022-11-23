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

const iconx = "⚫️";
const icono = "⚪️ ";
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
    const gagnant = win(ligne,colonne,etatJeu.cellules);
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

function win(i,j, y){
//Horizontal
for ( i = i; i < y.length; i++) {
  for(  j = j; j < y.length; j++ ) {
if (
  (etatJeu.cellules[i][j] === etatJeu.joueur &&
  etatJeu.cellules[i][(j + 1)] === etatJeu.joueur &&
  etatJeu.cellules[i][(j + 2)] === etatJeu.joueur &&
  etatJeu.cellules[i][(j + 3)] === etatJeu.joueur)
  ||
  (etatJeu.cellules[i][j] === etatJeu.joueur &&
  etatJeu.cellules[i][(j - 1)] === etatJeu.joueur &&
  etatJeu.cellules[i][(j - 2)] === etatJeu.joueur &&
  etatJeu.cellules[i][(j - 3)] === etatJeu.joueur)
) {
  return etatJeu.joueur;
}

// verticale


  if( 
    (y.length-4)<i<= 0 && 
    etatJeu.cellules[i][j] === etatJeu.joueur &&
    etatJeu.cellules[i +1][j] === etatJeu.joueur &&
    etatJeu.cellules[(i + 2)][j] === etatJeu.joueur &&
    etatJeu.cellules[(i + 3)][j] === etatJeu.joueur)
    {
      return etatJeu.joueur;
    }
  // Vérifie les diagonales
  if (
  ( (y.length-4)<i<= 0 && 
  etatJeu.cellules[i][j] === etatJeu.joueur &&
  etatJeu.cellules[(i + 1)][(j + 1)] === etatJeu.joueur &&
  etatJeu.cellules[(i + 2)][(j + 2)] === etatJeu.joueur &&
  etatJeu.cellules[(i + 3)][(j + 3)] === etatJeu.joueur) 
  ||
  ((y.length-4)<i<= 0 &&
  etatJeu.cellules[i][j] === etatJeu.joueur &&
  etatJeu.cellules[(i + 1)][(j - 1)] === etatJeu.joueur &&
  etatJeu.cellules[(i + 2)][(j - 2)] === etatJeu.joueur &&
  etatJeu.cellules[(i + 3)][(j - 3)] === etatJeu.joueur) 
  ||
  ((y.length-4)<i<= 0 &&
  etatJeu.cellules[i][j] === etatJeu.joueur &&
  etatJeu.cellules[(i-1)][(j-1)] === etatJeu.joueur &&
  etatJeu.cellules[(i-2)][(j-2)] === etatJeu.joueur &&
  etatJeu.cellules[(i-3)][(j-3)] === etatJeu.joueur) 

) {
  return etatJeu.joueur;
}
    }
  }

return null;
}


valide.addEventListener("click", function () {0
  let nombreLigne = Number(nbLignes.value)
  let nombreColumn = Number(nbColumns.value)
  if (nombreLigne < 5){
    nombreLigne = 5
  }
  if (nombreColumn < 6){
    nombreColumn = 6
    alert(`les valeurs ont était mise a 5 ligne et 6 colonne car vous avez choisi des nombre trop petit`)
  }
  etatJeu.cellules = grille(nombreLigne, nombreColumn)
  alert(`votre tableau de jeu fait ${nombreLigne} de ligne et ${nombreColumn} de colonne`)

  nbColumns.hidden= true  
  nbLignes.hidden= true  
  valide.hidden= true 
const cellules = document.querySelectorAll(".case");
for (const cellule of cellules) {
  cellule.addEventListener("click", jouer);

}

});

