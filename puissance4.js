// variable 
let nbColumns = document.querySelector("#nbColumn");
let  nbLignes = document.querySelector("#nbLigne");
let  valide = document.querySelector("#valide");
let etatJeu = {
  cellules: [],

  // Deux joueurs possibles : "BLEU" ou "ORANGE"
  joueur: "NOIR",
};

// // Selection les élements du tableau

const iconx = "⚫️";
const icono = "⚪️ ";
const cellules = document.querySelectorAll(".cellule");
const message = document.querySelector("#instruction");

function jouer(event) {
  const id = event.target.getAttribute("id");
  const idInfo = id.split("-");
  const ligne = Number(idInfo[1]);
  const colonne = Number(idInfo[2]);
  const cellule = etatJeu.cellules[ligne][colonne];
  if (cellule === null) {
    etatJeu.cellules[ligne][colonne] = etatJeu.joueur;
    event.target.textContent = etatJeu.joueur === "BLANC" ? icono : iconx;
    const gagnant = win(ligne,colonne,etatJeu.cellules);
    if (gagnant !== null) {
      message.textContent = `Le joueur ${gagnant} a gagné!`;
      cellules.forEach((cellule) => {
        cellule.removeEventListener("click", jouer);
        cellule.classList.add("disabled");
      });
    } else {
      etatJeu.joueur = etatJeu.joueur === "NOIR" ? "BLANC" : "NOIR";
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

function win(ligness,colonness, table2D){
//Horizontal
for ( ligness = ligness; ligness < table2D.length; ligness++) {
  for(  colonness = colonness; colonness < table2D.length; colonness++ ) {
if (
  (etatJeu.cellules[ligness][colonness] === etatJeu.joueur &&
  etatJeu.cellules[ligness][(colonness + 1)] === etatJeu.joueur &&
  etatJeu.cellules[ligness][(colonness + 2)] === etatJeu.joueur &&
  etatJeu.cellules[ligness][(colonness + 3)] === etatJeu.joueur)
  ||
  (etatJeu.cellules[ligness][colonness] === etatJeu.joueur &&
  etatJeu.cellules[ligness][(colonness - 1)] === etatJeu.joueur &&
  etatJeu.cellules[ligness][(colonness - 2)] === etatJeu.joueur &&
  etatJeu.cellules[ligness][(colonness - 3)] === etatJeu.joueur)
){
  return etatJeu.joueur;
}


// verticale


  if( 
    (table2D.length-4)<ligness<= 0 && 
    etatJeu.cellules[ligness][colonness] === etatJeu.joueur &&
    etatJeu.cellules[(ligness +1)][colonness] === etatJeu.joueur &&
    etatJeu.cellules[(ligness + 2)][colonness] === etatJeu.joueur &&
    etatJeu.cellules[(ligness + 3)][colonness] === etatJeu.joueur)
    {
      return etatJeu.joueur;
    }
  // Vérifie les diagonales
  if (
  ( (table2D.length-4)<ligness<= 0 && 
  etatJeu.cellules[ligness][colonness] === etatJeu.joueur &&
  etatJeu.cellules[(ligness + 1)][(colonness + 1)] === etatJeu.joueur &&
  etatJeu.cellules[(ligness + 2)][(colonness + 2)] === etatJeu.joueur &&
  etatJeu.cellules[(ligness + 3)][(colonness + 3)] === etatJeu.joueur) 
  ||
  ((table2D.length-4)<ligness<= 0 &&
  etatJeu.cellules[ligness][colonness] === etatJeu.joueur &&
  etatJeu.cellules[(ligness + 1)][(colonness - 1)] === etatJeu.joueur &&
  etatJeu.cellules[(ligness + 2)][(colonness - 2)] === etatJeu.joueur &&
  etatJeu.cellules[(ligness + 3)][(colonness - 3)] === etatJeu.joueur) 
  ||
  ((table2D.length-4)<ligness<= 0 &&
  etatJeu.cellules[ligness][colonness] === etatJeu.joueur &&
  etatJeu.cellules[(ligness-1)][(colonness-1)] === etatJeu.joueur &&
  etatJeu.cellules[(ligness-2)][(colonness-2)] === etatJeu.joueur &&
  etatJeu.cellules[(ligness-3)][(colonness-3)] === etatJeu.joueur) 

) {
  return etatJeu.joueur;
}
    }


return null;
}
}

valide.addEventListener("click", function () {
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

})

