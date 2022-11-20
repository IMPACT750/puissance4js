let etatJeu = {
  cellules: [],

  // Deux joueurs possibles : "BLEU" ou "ORANGE"
  joueur: "BLEU",
};

// // Selection les élements du tableau
// // création de fonction
const iconx = "😀";
const icono = "😛";
function jouer(event) {
  console.log(event.target.id);
  const id = event.target.id;
  const idinfo = id.split("-");
  const ligne = Number(idinfo[1]);
  const colonne = Number(idinfo[2]);
  console.log(colonne, ligne);
  const etatCelules = etatJeu.cellules[ligne][colonne];
  if (etatCelules !== null) return;
  const icon = etatJeu.joueur === "BLEU" ? iconx : icono;
  event.target.textContent = icon;
  etatJeu.cellules[ligne][colonne] = etatJeu.joueur;
  etatJeu.joueur = etatJeu.joueur === "BLEU" ? "ROND" : "BLEU";
}


// grille addeptative
let nbColumns = document.querySelector("#nbColumn");
let  nbLignes = document.querySelector("#nbLigne");
let  valide = document.querySelector("#valide");
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

