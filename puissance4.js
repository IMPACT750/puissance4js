// variable 
let nbColumns = document.querySelector("#nbColumn");
let  nbLignes = document.querySelector("#nbLigne");
let  valide = document.querySelector("#valide");
let etatJeu = {
  cellules: [],
  joueur: "NOIR",
};

// jouer

const iconNoir = "⚫️";
const iconBlanc = "⚪️ ";

const message = document.querySelector("#instruction");
const message1 = document.querySelector(".score");

function jouer(event) {
  const id = event.target.getAttribute("id");
  const idInfo = id.split("-");
  const colonne = Number(idInfo[2]);
  
  // gravité
  for (let i = etatJeu.cellules.length - 1; i >= 0; i--){
  if (etatJeu.cellules[i][colonne] === null) {
    const cellules = document.querySelector(`#cell-${i}-${colonne}`);
    etatJeu.cellules[i][colonne] = etatJeu.joueur;
    cellules.textContent = etatJeu.joueur === "BLANC" ? iconBlanc : iconNoir;
    console.table(etatJeu.cellules);

//vérifier la vitoire 
    const gagnant = win(i,colonne,etatJeu.cellules);
    if (gagnant !== null) {
      message1.textContent = `Le joueur ${gagnant} a gagné!`;
      cellules.forEach((cellule) => {
        cellule.removeEventListener("click", jouer);
        cellule.classList.add("disabled");
      });
    } else {
      etatJeu.joueur = etatJeu.joueur === "NOIR" ? "BLANC" : "NOIR";
      message.textContent = `Au tour du joueur ${etatJeu.joueur}`;
    } ;
break}}
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
      tr.classList.add("tr")
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

// condition de victoire  

function win(parametreLigne,parametreColonne, table2D){
//Horizontal
for ( parametreLigne = parametreLigne; parametreLigne < table2D.length; parametreLigne++) {
  for(  parametreColonne = parametreColonne; parametreColonne < table2D.length; parametreColonne++ ) {
if (
  (etatJeu.cellules[parametreLigne][parametreColonne] === etatJeu.joueur &&
  etatJeu.cellules[parametreLigne][(parametreColonne + 1)] === etatJeu.joueur &&
  etatJeu.cellules[parametreLigne][(parametreColonne + 2)] === etatJeu.joueur &&
  etatJeu.cellules[parametreLigne][(parametreColonne + 3)] === etatJeu.joueur)
  ||
  (etatJeu.cellules[parametreLigne][parametreColonne] === etatJeu.joueur &&
  etatJeu.cellules[parametreLigne][(parametreColonne - 1)] === etatJeu.joueur &&
  etatJeu.cellules[parametreLigne][(parametreColonne - 2)] === etatJeu.joueur &&
  etatJeu.cellules[parametreLigne][(parametreColonne - 3)] === etatJeu.joueur)
){
  return etatJeu.joueur;
}


// verticale


  if( 
    (table2D.length-4)<parametreLigne<= 0 && 
    etatJeu.cellules[parametreLigne][parametreColonne] === etatJeu.joueur &&
    etatJeu.cellules[(parametreLigne +1)][parametreColonne] === etatJeu.joueur &&
    etatJeu.cellules[(parametreLigne + 2)][parametreColonne] === etatJeu.joueur &&
    etatJeu.cellules[(parametreLigne + 3)][parametreColonne] === etatJeu.joueur)
    {
      return etatJeu.joueur;
    }
  // Vérifie les diagonales
  if (
  ( (table2D.length-4)<parametreLigne<= 0 && 
  etatJeu.cellules[parametreLigne][parametreColonne] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne + 1)][(parametreColonne + 1)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne + 2)][(parametreColonne + 2)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne + 3)][(parametreColonne + 3)] === etatJeu.joueur) 
  ||
  ((table2D.length-4)<parametreLigne<= 0 &&
  etatJeu.cellules[parametreLigne][parametreColonne] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne + 1)][(parametreColonne - 1)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne + 2)][(parametreColonne - 2)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne + 3)][(parametreColonne - 3)] === etatJeu.joueur) 
  ||
  ((table2D.length-4)<parametreLigne< 0 &&
  etatJeu.cellules[parametreLigne][parametreColonne] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne-1)][(parametreColonne-1)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne-2)][(parametreColonne-2)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne-3)][(parametreColonne-3)] === etatJeu.joueur) 

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

//Nouvelle partie 

let bouton_nouvelle_partie = document.querySelector("#partie");

bouton_nouvelle_partie.addEventListener("click", function() {
  location.reload();
});

//Reset 

let bouton_nouvelle_reset = document.querySelector("#reset");
 let table = document.querySelector(".table") 

bouton_nouvelle_reset.addEventListener("click", function() {
  let nombreLigne = Number(nbLignes.value)
  let nombreColumn = Number(nbColumns.value)
  table.remove()
  let table2 = document.createElement("table");
  table2.classList.add('.table')
  document.querySelector("body").appendChild(table2)
  etatJeu.cellules = etatJeu.joueur = 0;
  etatJeu.cellules = grille(nombreLigne, nombreColumn)
  alert(`votre tableau de jeu fait ${nombreLigne} de ligne et ${nombreColumn} de colonne`);
});


