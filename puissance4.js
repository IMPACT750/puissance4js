// variable 
let nbColumns = document.querySelector("#nbColumn");
let  nbLignes = document.querySelector("#nbLigne");
let  valide = document.querySelector("#valide");
let jeu2 = document.querySelector("#jeu");
let scorePlayerNoir = 0 
let scorePlayerBlanc = 0 
const labelLigne = document.querySelector(".labelLigne");
const labelColonne = document.querySelector(".labelColonne");
const tour = document.querySelector(".tour");
let nombreDeTour = 0
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
  console.table(etatJeu.cellules)
  // gravité
  for (let i = etatJeu.cellules.length - 1; i >= 0; i--){
  if (etatJeu.cellules[i][colonne] === null) {
    const cellules = document.querySelector(`#cell-${i}-${colonne}`);
    etatJeu.cellules[i][colonne] = etatJeu.joueur;
    cellules.textContent = etatJeu.joueur === "BLANC" ? iconBlanc : iconNoir;

// verifer si null 
   const rien = PasDeGagnant(i,etatJeu.cellules);
   if (rien === null){
    alert(`null`)
    nombreDeTour += 1;
    message1.textContent = `BLANC ${scorePlayerBlanc} vs ${scorePlayerNoir} NOIR`;
    tour.textContent = `${nombreDeTour}`;
   }
//vérifier la vitoire 
    const gagnant = win(i,colonne,etatJeu.cellules);
    if (gagnant !== null) {
      nombreDeTour += 1;
      tour.textContent = `${nombreDeTour}`;
      alert(`Le joueur ${gagnant} a gagné!`)
      reset()
// score 
      if (gagnant === "BLANC"){
        scorePlayerBlanc += 1;
        
        message1.textContent = `BLANC ${scorePlayerBlanc} vs ${scorePlayerNoir} NOIR`;
        
      }
      if (gagnant === "NOIR"){
        scorePlayerNoir += 1;
        message1.textContent = `BLANC ${scorePlayerBlanc} vs ${scorePlayerNoir} NOIR`;
      }
      reset()
      } 
      else {
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
  
for(  parametreColonne = parametreColonne ; parametreColonne < table2D[parametreLigne].length; parametreColonne++ ) {
//Horizontal

if (
  etatJeu.cellules[parametreLigne][parametreColonne] === etatJeu.joueur &&
  etatJeu.cellules[parametreLigne][(parametreColonne + 1)] === etatJeu.joueur &&
  etatJeu.cellules[parametreLigne][(parametreColonne + 2)] === etatJeu.joueur &&
  etatJeu.cellules[parametreLigne][(parametreColonne + 3)] === etatJeu.joueur
){
    return etatJeu.joueur;
  }
if(
  etatJeu.cellules[parametreLigne][parametreColonne] === etatJeu.joueur &&
  etatJeu.cellules[parametreLigne][(parametreColonne - 1)] === etatJeu.joueur &&
  etatJeu.cellules[parametreLigne][(parametreColonne - 2)] === etatJeu.joueur &&
  etatJeu.cellules[parametreLigne][(parametreColonne - 3)] === etatJeu.joueur
){
  return etatJeu.joueur;
}

// verticale
  if( 
    (table2D.length-4)< parametreLigne<= 0 && 
    etatJeu.cellules[parametreLigne][parametreColonne] === etatJeu.joueur &&
    etatJeu.cellules[(parametreLigne +1)][parametreColonne] === etatJeu.joueur &&
    etatJeu.cellules[(parametreLigne + 2)][parametreColonne] === etatJeu.joueur &&
    etatJeu.cellules[(parametreLigne + 3)][parametreColonne] === etatJeu.joueur
    ) {
      return etatJeu.joueur;
    }
  
// DIAGONALES



// Vérifie les diagonales au début ou a la fin


  if (
  (table2D.length-3) <= parametreLigne <= 0 && 
  etatJeu.cellules[parametreLigne][parametreLigne] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne + 1)][(parametreLigne + 1)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne + 2)][(parametreLigne + 2)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne + 3)][(parametreLigne + 3)] === etatJeu.joueur
  ) {
    return etatJeu.joueur;
  }
  if (
    (table2D.length-3) <= parametreLigne <= 0 && 
    etatJeu.cellules[parametreLigne][parametreColonne] === etatJeu.joueur &&
    etatJeu.cellules[(parametreLigne + 1)][(parametreColonne + 1)] === etatJeu.joueur &&
    etatJeu.cellules[(parametreLigne + 2)][(parametreColonne + 2)] === etatJeu.joueur &&
    etatJeu.cellules[(parametreLigne + 3)][(parametreColonne + 3)] === etatJeu.joueur
    ) {
      return etatJeu.joueur;
    }
  
  if (parametreLigne >= 3  && 
  etatJeu.cellules[parametreLigne][parametreLigne] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne-1)][(parametreLigne-1)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne-2)][(parametreLigne-2)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne-3)][(parametreLigne-3)] === etatJeu.joueur
) {
  return etatJeu.joueur;
}
  if (parametreLigne >= 3  && 
  etatJeu.cellules[parametreLigne][parametreColonne] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne-1)][(parametreColonne-1)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne-2)][(parametreColonne-2)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne-3)][(parametreColonne-3)] === etatJeu.joueur
) {
  return etatJeu.joueur;
}

if (
  (table2D.length-3) <= parametreLigne <= 0 &&
  etatJeu.cellules[parametreLigne][parametreColonne] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne + 1)][(parametreColonne - 1)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne + 2)][(parametreColonne - 2)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne + 3)][(parametreColonne - 3)] === etatJeu.joueur
  ) {
    return etatJeu.joueur;
  }

  if (
  parametreLigne >= 3 &&
  etatJeu.cellules[parametreLigne][parametreColonne] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne-1)][(parametreColonne + 1)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne-2)][(parametreColonne + 2)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne-3)][(parametreColonne + 3)] === etatJeu.joueur
) {
  return etatJeu.joueur;
}
// verifer les points au mileux  d'une diagonales
  if (
  (table2D.length-1) >parametreLigne > 1 &&
  etatJeu.cellules[parametreLigne][parametreColonne] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne+1)][(parametreColonne + 1)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne- 1 )][(parametreColonne - 1)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne- 2 )][(parametreColonne - 2)] === etatJeu.joueur
) {
  return etatJeu.joueur;
}
  if (
  (table2D.length-2) > parametreLigne  &&
  parametreLigne > 0 &&
  etatJeu.cellules[parametreLigne][parametreColonne] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne-1)][(parametreColonne - 1)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne + 1 )][(parametreColonne + 1)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne + 2 )][(parametreColonne + 2)] === etatJeu.joueur
) {
  return etatJeu.joueur;
}
if (
  (table2D.length-2) >=parametreLigne &&
  parametreLigne > 1 &&
  etatJeu.cellules[parametreLigne][parametreColonne] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne + 1)][(parametreColonne - 1)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne - 1 )][(parametreColonne + 1)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne - 2 )][(parametreColonne + 2)] === etatJeu.joueur
) {
  return etatJeu.joueur;
}
if (
  (table2D.length-2) > parametreLigne  &&
  parametreLigne > 0 &&
  etatJeu.cellules[parametreLigne][parametreColonne] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne - 1)][(parametreColonne + 1)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne + 1 )][(parametreColonne - 1)] === etatJeu.joueur &&
  etatJeu.cellules[(parametreLigne + 2 )][(parametreColonne - 2)] === etatJeu.joueur
) {
  return etatJeu.joueur;
}
}


return null;

}

// null 

function PasDeGagnant (parametreLigne, table2D){
  let null1 = 0
for(  let k  = 0 ; k < table2D.length-1; k++ ){
for(  j = 0 ;j < table2D[parametreLigne].length-1; j++ ){
  if(etatJeu.cellules[k][j] !== null){
    null1 += 1
    if (null1 === (table2D.length-1)*(table2D[parametreLigne].length-1)){
      return null
    }
  }
}

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
  labelLigne.hidden= true 
  labelColonne.hidden= true 
const cellules = document.querySelectorAll(".case");
for (const cellule of cellules) {
  cellule.addEventListener("click", jouer);
//boutton reset 
let bouton_nouvelle_reset = document.querySelector("#reset");
bouton_nouvelle_reset.addEventListener("click", reset)

 
}

})

//Nouvelle partie 

let bouton_nouvelle_partie = document.querySelector("#partie");

bouton_nouvelle_partie.addEventListener("click", function() {
  location.reload();
});

//Reset 


 function reset(){
 
  for(  let ligne  = 0 ; ligne <=etatJeu.cellules.length-1; ligne++ ){
    for(  colonne = 0 ;colonne <=etatJeu.cellules[ligne].length-1; colonne++ ){
      const cellules = document.querySelector(`#cell-${ligne}-${colonne}`);
      etatJeu.cellules[ligne][colonne]  = null;
    cellules.textContent = etatJeu.joueur === null ? "" : "";
        }
      } 
    return etatJeu.cellules
  }




